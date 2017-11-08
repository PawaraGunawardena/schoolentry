var db = require('../config/db');
var bcrypt = require('bcryptjs');
var mysqlJson = require('mysql-json');
var async = require('async');

exports.insert = function (applicant ,pool, done) {
    pool.getConnection(function (err, connection) {
        if(err) throw err;
        var query = connection.query('INSERT INTO applicant SET ?, age = (TIMESTAMPDIFF(YEAR,?,CURDATE()))', [applicant, applicant.date_of_birth], function (error, results) {
            if(error) throw error;
        });
        console.log('Insert Query: ' + query);
        console.log('Applicant Inserted!');
        connection.release();
    });
};
