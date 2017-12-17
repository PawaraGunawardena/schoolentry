var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var mysql  = require('mysql');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var hbs = require('hbs');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');
//Require db file which is inside the config file.
var db = require('./config/db');
var index = require('./routes/index');
var users = require('./routes/users');
var usermodel = require('./models/users');
var guardianmodel = require('./models/guardian');
var schoolmodel = require('./models/school');
var oldstudentmodel = require('./models/oldstudents');
var applicantmodel = require('./models/applicant');
var connectionPool = db.pool;
var app = express();

// view engine setup
app.set('views',
    [
        path.join(__dirname, 'views'),
        path.join(__dirname, 'views/users'),
        path.join(__dirname, 'views/applicant'),
        path.join(__dirname, 'views/schools'),
        path.join(__dirname, 'views/oldstudents')
    ]
);
app.set('view engine', 'hbs');

//Test for connections
connectionPool.getConnection((function(err, connection){
    if(err) throw err;
    console.log('Connection successful!');
    connection.release();
}));

//Partial Registryclear
hbs.registerPartials(__dirname + '/views/partials');

//Helper Registry
hbs.registerHelper(
    {
        section: function(name, options) {
            if (!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        }
    }
);

//Adding middleware.
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
            , root = namespace.shift()
            , formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

app.use(flash());
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

//Require the passport initialization file.
require('./config/passport')(passport,connectionPool, LocalStrategy);

var indexRoutes = require('./routes/index')(app, express, passport, connectionPool, 
    usermodel, guardianmodel, applicantmodel, LocalStrategy);
//Setting controllers.
app.use('/', indexRoutes);

//Setting user controller
var userRoutes = require('./routes/users')(app, express, passport, connectionPool, usermodel, LocalStrategy);
app.use('/users', userRoutes);

//Setting school controllers.
var schoolRoutes = require('./routes/schools')(app, express, connectionPool , schoolmodel);
app.use('/school', schoolRoutes);

var oldStudentRoutes = require('./routes/old_student')(app, express, connectionPool , oldstudentmodel);
app.use('/oldstudents', oldStudentRoutes);

//Setting applicant controller.
var applicantRoutes = require('./routes/applicant')(app, express, connectionPool, applicantmodel);
app.use('/applicant', applicantRoutes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
