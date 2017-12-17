var db = require('../config/db');
var bcrypt = require('bcryptjs');
var mysqlJson = require('mysql-json');
var async = require('async');

exports.insert = function (guardian ,pool, done) {
    pool.getConnection(function (err, connection) {
        if(err) throw err;
        var query = connection.query('INSERT INTO guardian SET ?, age = (TIMESTAMPDIFF(YEAR,?,CURDATE()))', [guardian, guardian.date_of_birth], function (error, results) {
            if(error) throw error;
        });
        console.log('Insert Query: ' + query);
        console.log('Guardian Inserted!');
        connection.release();
    });
};

exports.getGuardian=function (guardianNIC,pool) {
    return new Promise(fn);

    function fn(resolve, reject) {
        pool.getConnection(function (error, connection) {
            if (error) {
                return reject(error)
            } else {
                connection.query('SELECT `first_name` FROM `applicant` WHERE `guardian_nic_no` = ?', guardianNIC, function (err, rows) {
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
}

