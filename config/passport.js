var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');
var mysql = require('mysql');
var db = require('./db');
var user = require('../models/users');
var flash = require('connect-flash');

module.exports = function (passport, pool, LocalStrategy) {

    //This will create a session for logins.
    passport.serializeUser(function (user, done) {
       done(null, user.id);
    });

    //This will remove login sessions from a user.
    passport.deserializeUser(function (id, done) {
        pool.getConnection(function (error, connection) {
           connection.query('SELECT * FROM users WHERE id = ?', id, function (err, rows) {
               done(err, rows[0]);
           });
        });
    });

    //Initializing Passport local-login strategy.
    passport.use('local-login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, function (req, username, password, done) {
        pool.getConnection(function (err, connection) {
           if(err) throw err;
           var query = connection.query('SELECT * from users WHERE username = ?', username, function (err, rows) {
              if(err) return done(err);
              if(!rows.length) {
                  return done(null, false, req.flash('loginMessage', 'No User Found'));
              }
              //Comparing passwords using bcrypt
               bcrypt.compare(password, rows[0].password, function(error, res){
                   if(res){
                       return done(null, rows[0]);
                   } else {
                       return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                   }
               });
           });
            connection.release();   //Release the database connection pool.
        });
    }));
};


