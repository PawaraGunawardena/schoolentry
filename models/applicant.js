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
exports.getApplicantsForGuardian=function (guardianNIC,pool) {
    return new Promise(fn);
    function fn(resolve, reject) {
        pool.getConnection(function (error, connection) {
            if(error){
                return reject(error)
            }else {
                connection.query('SELECT `applicant_id`,`first_name`,`last_name`,`date_of_birth`,`age`,`nationality`,`religion`,`gender` FROM `applicant` WHERE `guardian_nic_no` = ?',guardianNIC, function (err, rows) {
                    if(err) {
                        return reject(err);
                    }else {
                        connection.release();
                        return resolve(rows);
                    }
                })
            }
        });
    }

}

exports.getGuardians=function (guardianNIC,pool) {
    return new Promise(fn);
    function fn(resolve, reject) {
        pool.getConnection(function (error, connection) {
            if(error){
                return reject(error)
            }else {
                connection.query('SELECT `first_name` FROM `guardian` WHERE `guardian_nic_no`= ?',guardianNIC, function (err, rows) {
                    if(err) {
                        return reject(err);
                    }else {
                        connection.release();
                        return resolve(rows);
                    }
                })
            }
        });
    }

}