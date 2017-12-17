var express = require('express');
var db = require('../config/db');
var oldstudentmodel = require('../models/oldstudents');
var path = require('path');

module.exports = function(app, express, pool, oldstudentmodel){
    var router = express.Router();
    //schools index route
    router.get('/', function(req, res){
        res.render('oldstudent');
    });

    router.post('/old_student_details', function (req, res, next) {
        // var school = {
        //     school_id: '0',
        //     name: req.body.school_name,
        //     postal_number: req.body.school_posatal,
        //     road: req.body.school_road,
        //     // age: req.body.age,
        //     city: req.body.school_city,
        //     Province: req.body.province_dropdown,
        //     max_value_of_grade_one_entries: req.body.school_max_students,
        //     buddhism_percentage: req.body.school_buddhism,
        //     christianity_percentage: req.body.school_christianity,
        //     islam_percentage: req.body.school_islamic,
        //     Hindu_percentage: req.body.school_hindu,
        //     religion_others_percentage: req.body.guardian_nic_no
        // };
        //console.log(school.name);
        schoolmodel.insert(req.body.admission_no,
            req.body.first_name,
            req.body.last_name,
            req.body.date_of_birth,
            4,
            req.body.nationality_dropdown,
            req.body.religion_dropdown,
            req.body.gender,
            req.body.guardian_nic_no,
            pool);
        // res.render('applicant-details',{username: req.user.username});
        res.redirect('/oldstudent');
        //res.sendFile(path.join(__dirname + '/../pages/loginpage.html'));
    });
    return router;
}
