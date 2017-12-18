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

exports.insert = function(school_id,
                          name,
                          postal_number,
                          road,
                          city,
                          Province,
                          max_value_of_grade_one_entries,
                          buddhism_precentage,
                          christianity_precentage,
                          islam_precentage,
                          Hindu_percentage,
                          religion_others_precentage,
                          pool){

    var school = {
        school_id: school_id,
        name:name,
        postal_number:postal_number,
        road:road,
        city:city,
        Province:Province,
        max_value_of_grade_one_entries:max_value_of_grade_one_entries ,
        buddhism_precentage:buddhism_precentage,
        christianity_precentage:christianity_precentage,
        islam_precentage:islam_precentage,
        Hindu_percentage:Hindu_percentage,
        religion_others_precentage:religion_others_precentage};

    pool.getConnection(function (err, connection) {
        if (err) throw err;
        var query = connection.query('INSERT INTO school SET ?', school, function (error, results) {
            if(error) throw error;
        });
        console.log('Insert query: ' + query.sql);
        console.log('School Inserted!');
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

exports.getSchoolID=function (username,pool) {
    return new Promise(fn);

    function fn(resolve, reject) {
        pool.getConnection(function (error, connection) {
            if (error) {
                return reject(error)
            } else {
                connection.query('SELECT `school_id` FROM `officer_school` WHERE  officer_username = ?', username, function (err, uids) {
                    if (err) {
                        return reject(err);
                    } else {
                        connection.release();
                        return resolve(uids);
                    }
                })
            }
        });
    }
}

exports.getschoolName = function (pool, done) {
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

exports.remove = function(name, pool, done){
    //Make sure to verify that a user cannot remove himself.
    //Make sure he enters an existing user.
    pool.getConnection(function(err, connection){
        if(err) throw err;
        var query = connection.query('DELETE FROM school WHERE name = ?', name, function(error, results){
            if(error) throw error;
        });
        console.log('Delete query: ' + query.sql);
        console.log('School deleted!');
    });
}


exports.select = function(name, pool, done){
    //Make sure to verify that a user cannot remove himself.
    //Make sure he enters an existing user.
    pool.getConnection(function(err, connection){
        if(err) throw err;
        var query = connection.query('SELECT * FROM school WHERE name = ?', name, function(error, results){
            if(error) throw error;
        });
        console.log('Select query: ' + query.sql);
        console.log('School selected!');
    });
}

/*exports.getvacancies = function(school_username, pool, done){
    pool.getConnection(function(err, connection){
        if(err) throw err;
        var query = connection.query('SELECT * FROM school left outer join officer_school USING(school_id) WHERE officer_school.officer_username= ?', school_username, function(error, results){
            if(error) throw error;
        });
        console.log('Select query: ' + query.sql);
        console.log('vacancies selected!');
    });
};*/

exports.getvacancies = function (school_username,pool, done) {
    return new Promise(fn);
    function fn(resolve, reject) {
        pool.getConnection(function (error, connection) {
            if(error){
                return reject(error)
            }else {
                connection.query('SELECT * FROM school left outer join officer_school USING(school_id) WHERE officer_school.officer_username= ?',school_username, function (err, rows) {
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

exports.getselectedlist = function (schoolid,max_limit,pool, done) {
    return new Promise(fn);
    function fn(resolve, reject) {
        pool.getConnection(function (error, connection) {
            if(error){
                return reject(error)
            }else {
                connection.query('SELECT `applicant_id`,`first_name`,`last_name`,`total_marks` FROM `marks` WHERE `school_id`=? order by `total_marks` desc limit ?',[schoolid,max_limit], function (err, rows) {
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

exports.update = function (name,
                           max_value_of_grade_one_entries,
                           buddhism_percentage,
                           christianity_percentage,
                           islam_percentage,
                           Hindu_percentage,
                           religion_others_percentage,
                           pool,
                           done) {
    {

        var school = {max_value_of_grade_one_entries:max_value_of_grade_one_entries,
            buddhism_percentage:buddhism_percentage,
            christianity_percentage:christianity_percentage,
            islam_percentage:islam_percentage,
            Hindu_percentage:Hindu_percentage,
            religion_others_percentage:religion_others_percentage,
            name:name};

        console.log(res);
        {
            if(error) throw err;
            if(res){
                pool.getConnection(function (err, connection) {
                    if (err) throw err;
                    var query = connection.query('UPDATE school SET ? WHERE name = ?',school , function (error, results) {
                        if(error) throw error;
                    });
                    console.log('Update query: ' + query.sql);
                    console.log('School updated!');
                    connection.release();
                });
            }
        }
    }
};