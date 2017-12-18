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
                          first_name,
                          last_name,
                          date_of_birth,
                          age,
                          nationality,
                          religion,
                          gender,
                          guardian_nic_no,
                          pool){

    var old_student = {
        old_student_id: old_student_id,
        first_name:first_name,
        last_name:last_name,
        date_of_birth:date_of_birth,
        age:age,
        nationality:nationality,
        religion:religion ,
        gender:gender,
        guardian_nic_no:guardian_nic_no
    };

    pool.getConnection(function (err, connection) {
        if (err) throw err;
        var query = connection.query('INSERT INTO old_student SET ?', old_student, function (error, results) {
            if(error) throw error;
        });
        console.log('Insert query: ' + query.sql);
        console.log('Old Student Inserted!');
        connection.release();
    });
};

exports.getOldStudentID=function (student_id,pool) {
    return new Promise(fn);

    function fn(resolve, reject) {
        pool.getConnection(function (error, connection) {
            if (error) {
                return reject(error)
            } else {
                connection.query('SELECT * FROM old_student WHERE  old_student_id = ?', student_id, function (err, rows) {
                    if (err) {
                        return reject(err);
                    } else {
                        connection.release();
                        return resolve(rows);
                    }
                })
            }
        });
    }
};




