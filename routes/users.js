module.exports = function (app, express, passport) {
  var router = express.Router();

    router.get('/', function(req, res, next) {
        res.send('respond with a resource');
    });

    router.get('/login', function (req, res, next) {
        res.render('login', {title: 'Login'});
    });

    router.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/users/login',
        failureFlash: true
    }));

  return router;
};
