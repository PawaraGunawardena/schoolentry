var db = require('../config/db');
var bcrypt = require('bcryptjs');
var mysqlJson = require('mysql-json');
var async = require('async');

/*exports.insert = function (applicant ,pool, done) {
    pool.getConnection(function (err, connection) {
        if(err) throw err;
        var query = connection.query('INSERT INTO school SET ?, name = (TIMESTAMPDIFF(YEAR,?,CURDATE()))', [applicant, applicant.date_of_birth], function (error, results) {
            if(error) throw error;
        });
        console.log('Insert Query: ' + query);
        console.log('School Inserted!');
        connection.release();
    });
};*/

exports.insert = function(old_student_id,
                          school_name,
                          date_of_admission,
                          medium,
                          pool){

    var old_student_school = {
        old_student_id: old_student_id,
        school_name:school_name,
        date_of_admission:date_of_admission,
        medium:medium
    };

    pool.getConnection(function (err, connection) {
        if (err) throw err;
        var query = connection.query('INSERT INTO old_student_school SET ?', old_student_school, function (error, results) {
            if(error) throw error;
        });
        console.log('Insert query: ' + query.sql);
        console.log('Old Student school Inserted!');
        connection.release();
    });
};


