var bodyParser = require('body-parser');
var path = require('path');
var db = require('../config/db');
var usermodel = require('../models/users');
var session = require('express-session');

module.exports = function (app, express, passport, pool, usermodel, LocalStrategy) {

    var router = express.Router();

    //Root user route
    router.get('/', function(req, res, next) {
        res.send('respond with a resource');
    });

    router.get('/login', function (req, res, next) {
        // res.render('login', {title: 'Login'});
        res.sendFile(path.join(__dirname, '/../pages/loginpage.html'));
    });

    router.get('/signup', function (req, res, next) {
        res.render('signup');
    });

    router.post('/signup', function (req, res, next) {
        req.logout();
        if(req.body.password == req.body.confirmpassword) {
            //usermodel.insert('pavan', 'pavan', 'school_clerk','abc@email.com','T', connectionPool);
            // usermodel.insert(2, 'dilan','dilan','moe_officer','email','T',connectionPool);
            usermodel.insert(req.body.username,  req.body.password, req.body.user_type,  req.body.email, 'T' ,pool);
            res.sendFile(path.join(__dirname + '/../pages/loginpage.html'));    //Try to redirect this to users' page
        } else {
            console.log('Password mismatch!')
            // alert('Password Mismatch!');
            res.redirect('/signup');
        }
    });

    //authenticationMiddleware() is a route handler which acts as a express middleware.
    //Check for Express Routing documentation for more details.
    router.get('/userprofile/:username', authenticationMiddleware(), function (req, res, next) {
        usermodel.getUserInfo(req.params.username, pool).then(function (rows) {
            res.render(rows[0].user_type , {
                username: req.params.username.charAt(0).toUpperCase() + req.params.username.slice((1)),
                title: 'Welcome, '+ req.params.username
            });
        }).catch(function (err) {
            console.log(err);
        });
    });

    router.post('/login', function (req, res, next) {
        console.log("Username is: " + req.body.username);
        passport.authenticate('local-login', {
            successRedirect: '/users/userprofile/' + req.body.username,
            failureRedirect: '/users/login',
            failureFlash: true
        })(req, res, next);
    });

    //logout route
    router.get('/logout',authenticationMiddleware(), function (req, res, next) {
        req.session.destroy(function (err) {
            res.redirect('/')
        });
    });

    router.get('/update',authenticationMiddleware(), function(req, res, next){
        usermodel.getUserInfo(req.user.username, pool).then(function(rows){
            res.render('update', {username: req.user.username,password: req.user.password, email: rows[0].email});
        });
    });

    router.post('/update', function(req, res, next){
        if(req.body.newpassword == req.body.confirmpassword){
            usermodel.update(req.user.username, req.body.username, req.body.newpassword,req.user.password,req.body.oldpassword, req.body.email, pool);
            req.session.destroy(function(err){
                res.redirect('/users/login');
            });
        }else{
            console.log('Password mismatch!!!');
            res.redirect('/users/update');
        }
    });

    router.get('/remove', authenticationMiddleware(), function(req, res, next){
        res.render('userremove');
    });

    router.post('/remove', function(req, res, next){
        usermodel.getUserInfo(req.body.username, pool).then(function(rows){
            if(rows[0].username !=  null){
                usermodel.remove(req.body.username,pool);
                 res.redirect('/users/userprofile/' + req.user.username);
            }else{
                res.render('remove', {faliureMessage: "There is no users in the database matching with the username which you have provided."});
            }
        });
        // usermodel.remove(req.user.username, pool);
    });

    //This will prevent the user from going to the userprofile route without logging in.
    function authenticationMiddleware() {
        return function (req, res, next) {
            if(req.isAuthenticated()) {
                next();
            } else {
                res.send('User not verified!');
            }
        }
    }

    return router;
};
