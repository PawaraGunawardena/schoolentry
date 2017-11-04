module.exports = function (app, express, passport) {
    var router = express.Router();
    //Root user route
    router.get('/', function(req, res, next) {
        res.send('respond with a resource');
    });

    router.get('/login', function (req, res, next) {
        res.render('login', {title: 'Login'});
    });

    router.get('/userprofile', authenticationMiddleware(), function (req, res, next) {
        res.render('userprofile');
    });

    router.post('/login', passport.authenticate('local-login', {
        successRedirect: '/users/userprofile',
        failureRedirect: '/users/login',
        failureFlash: true
    }));

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
