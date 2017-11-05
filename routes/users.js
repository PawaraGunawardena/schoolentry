var bodyParser = require('body-parser');
var path = require('path');
var db = require('../config/db');
var usermodel = require('../models/users');

module.exports = function (app, express, passport, LocalStrategy) {
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
        if(req.body.password == req.body.confirmpassword) {
            usermodel.insert(req.body.username, req.body.password);
            res.sendFile(path.join(__dirname + '/../pages/loginpage.html'));
        } else {
            console.log('Password mismatch!');
        }
    });

    //authenticationMiddleware() is a route handler which acts as a express middleware.
    //Check for Express Routing documentation for more details.
    router.get('/userprofile/:username', authenticationMiddleware(), function (req, res, next) {
        res.render('userprofile', {
            username: req.params.username,
            title: 'Welcome, '+ req.params.username
        });
    });

    // //Check this for viability and security.
    router.post('/login', function (req, res, next) { //Testing callback.
        console.log("Username is: " + req.body.username);
        passport.authenticate('local-login', {
            successRedirect: '/users/userprofile/' + req.body.username, //We need to add the username here.
            failureRedirect: '/users/login',
            failureFlash: true
        })(req, res, next);   //There's a header 302 HTTP error. Check that out. However the code works.
        next();
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
