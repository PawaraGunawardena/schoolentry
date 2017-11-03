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
var bcrypt = require('bcryptjs');
//Require db file which is inside the config file.
var db = require('./config/db');
var index = require('./routes/index');
var users = require('./routes/users');
var usermodel = require('./models/users');
var app = express();

var user = {username:'Oshada', password: 'oshadaspw'};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//Test for connections
db.pool.getConnection((function(err, connection){
  if(err) throw err;

  // connection.query('SELECT * FROM users', function (error, results, fields) {
  //    console.log(results);
  // });

  //You can enter a JSON object into the database.
  // var query = connection.query('INSERT INTO users  SET ?', user, function(error, results, fields){
  //   if(error) throw error;
  //
  // });
  // console.log(query.sql);
  console.log('Connection successful!');
  connection.release();
}));

//Testing of inserting a record.
usermodel.insert('pamoda', 'pamodaspw');


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
//Setting controllers.
app.use('/', index);
app.use('/users', users);

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
