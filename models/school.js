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

exports.insert = function(school_id, name, postal_number,road,city,Province,max_value_of_grade_one_entries,buddhism_precentage,christianity_precentage,islam_precentage,Hindu_percentage,religion_others_precentage, pool, done){
    bcrypt.hash(password, 8, function (err, hash) {
        var school = {school_id: school_id,name:name,postal_number:postal_number,road:road,city:city,
            Province:Province,max_value_of_grade_one_entries:max_value_of_grade_one_entries ,buddhism_precentage:buddhism_precentage,
            christianity_precentage:christianity_precentage,islam_precentage:islam_precentage,
            Hindu_percentage:Hindu_percentage,religion_others_precentage:religion_others_precentage};
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            var query = connection.query('INSERT INTO school SET ?', school, function (error, results) {
                if(error) throw error;
            });
            console.log('Insert query: ' + query.sql);
            console.log('Users Inserted!');

            // if(user_type == 'moe_officer'){
            //     var moe_officer = {
            //         officer_moe_id:
            //         id, post: 'moe_officer',
            //         first_name: first_name,
            //         last_name: last_name,
            //         date_of_birth: dob,
            //         nationality: nationality,
            //         religion: religion,
            //         gender: gender
            //     };
            //     var query2 = connection.query('INSERT INTO officer_ministry_of_education SET ?', moe_officer, function (err, results) {
            //        if(err) throw err;
            //     });
            // };

            connection.release();
        });
    });
};


