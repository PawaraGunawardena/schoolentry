var db = require('../config/db');
var bcrypt = require('bcryptjs');
var mysqlJson = require('mysql-json');
var async = require('async');

exports.insert = function (guardian ,pool, done) {
    pool.getConnection(function (err, connection) {
       if(err) throw err;
       var query = connection.query('INSERT INTO guardian SET ?', guardian, function (error, results) {
           if(error) throw error;
       });
       console.log('Insert Query: ' + query);
       console.log('Guardian Inserted!');
       connection.release();
    });
};