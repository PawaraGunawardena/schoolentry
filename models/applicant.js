var db = require('../config/db');
var bcrypt = require('bcryptjs');
var mysqlJson = require('mysql-json');
var async = require('async');

exports.insert = function (applicant, pool, done) {
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


exports.insertApplicantSchoolDetails = function (appliedSchool, pool, done) {
    pool.getConnection(function (err, connection) {
        if(err) throw err;
        var query = connection.query('INSERT INTO applicant_applies_school SET ?', appliedSchool, function (error, result) {
            if(error) throw error;
        });
        console.log('Insert Query: ' + query);
        console.log('Applicant school Inserted!');
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

exports.getSchoolName = function (pool, done) {
    return new Promise(fn);
    function fn(resolve, reject) {
        pool.getConnection(function (error, connection) {
           if(error){
               return reject(error)
           }else {
               connection.query('SELECT * FROM school', function (err, rows) {
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
  };

exports.getApplicantIDfromAppliesSchool= function (applicant_id,medium,school_id, pool) {
    return new Promise(fn);

    function fn(resolve, reject) {
        pool.getConnection(function (error, connection) {
            if (error) {
                return reject(error)
            } else {
                connection.query('SELECT * FROM applicant_applies_school WHERE applicant_id=? AND medium=? AND school_id=?', [applicant_id,medium,school_id], function (err, rows) {
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


exports.getSchoolID = function (schoolName, pool, done) {
    return new Promise(fn);
    function fn(resolve, reject) {
        pool.getConnection(function (error, connection) {
            if(error){
                return reject(error)
            }else {
                connection.query('SELECT * FROM school WHERE name=?', schoolName, function (err, rows) {
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
};

exports.insertApplicantInterviewMarks = function (interview_marks, pool, done) {
    pool.getConnection(function (err, connection) {
        if(err) throw err;
        var query = connection.query('INSERT INTO applicant_interview_school SET ?', interview_marks, function (error, result) {
            if(error) throw error;
        });
        console.log('Insert Query: ' + query);
        console.log('Interview marks Inserted!');
        connection.release();
    });
};