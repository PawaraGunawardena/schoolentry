var db = require('../config/db');
var bcrypt = require('bcryptjs');
var mysqlJson = require('mysql-json');
var async = require('async');

// exports.getApplicantIDfromAppliesSchool = function (applicant_id, medium, school_id, pool, done) {
//     return new Promise(fn);
//     function fn(resolve, reject) {
//         pool.getConnection(function (error, connection) {
//             if(error){
//                 return reject(error);
//             }else {
//                 connection.query('SELECT * FROM applicant_applies_school WHERE applicant_id=? AND medium=? AND school_id=?', applicant_id, medium, school_id, function (err, rows) {
//                     if(err) {
//                         return reject(err);
//                     }else {
//                         connection.release();
//                         return resolve(rows);
//                     }
//                 })
//             }
//         });
//     }
// };

exports.getApplicantIDfromAppliesSchool= function (applicant_id,medium,school_id, pool) {
    return new Promise(fn);

    function fn(resolve, reject) {
        pool.getConnection(function (error, connection) {
            if (error) {
                return reject(error)
            } else {
                connection.query('SELECT applicant_id FROM `applicant_applies_school` WHERE `applicant_id`=? AND `medium`=? AND `school_id`=?', applicant_id,medium,school_id, function (err, rows) {
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