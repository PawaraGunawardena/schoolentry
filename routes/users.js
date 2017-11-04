var bodyParser = require('body-parser');
var username;

module.exports = function (app, express, passport, LocalStrategy) {
    var router = express.Router();
    //Root user route
    router.get('/', function(req, res, next) {
        res.send('respond with a resource');
    });

    router.get('/login', function (req, res, next) {
        res.render('login', {title: 'Login'});
    });

    //authenticationMiddleware() is a route handler which acts as a express middleware.
    //Check for Express Routing documentation for more details.
    router.get('/:username', authenticationMiddleware(), function (req, res, next) {
        // console.log(bodyParser.json(req));
        // res.render(req.params.username);
        res.render('' + req.params.username);
    });

    //Check this for viability and security.
    router.post('/login', function (req, res, next) { //Testing callback.
        console.log("Username is: " + req.body.username);
        passport.authenticate('local-login', {
            successRedirect: '/users/' + req.body.username, //We need to add the username here.
            failureRedirect: '/users/login',
            failureFlash: true
        })(req, res);   //There's a header 302 HTTP error. Check that out. However the code works.
        next();
    });

    //This will prevent the user from going to the userprofile route without logging in.
    function authenticationMiddleware() {
        return function (req, res, next) {
            if(req.isAuthenticated()) {
                return next();
            } else {
                res.send('User not verified!');
            }
        }
    }
    return router;
};
