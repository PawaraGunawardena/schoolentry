var express = require('express');
var db = require('../config/db');
var oldstudentmodel = require('../models/oldstudents');
var oldstudentmodel1 = require('../models/oldstudents_school');
var path = require('path');

module.exports = function(app, express, pool, oldstudentmodel){
    var router = express.Router();
    //schools index route
    router.get('/', function(req, res){
        res.render('oldstudents');
    });

    router.get('/oldstudents_school', function(req, res, next){
        res.render('oldstudent_school');
    });

    router.post('/old_student_details', function (req, res, next) {
        oldstudentmodel.insert(
            req.body.admission_no,
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
        res.render('oldstudents_school',{adm_no:req.body.admission_no});
        //res.sendFile(path.join(__dirname + '/../pages/loginpage.html'));
    });

    router.post('/old_student_school_details', function (req, res, next) {
        oldstudentmodel1.insert(
            req.body.admission_no,
            req.body.school_name,
            req.body.date_of_admission,
            req.body.medium,
            pool);
        // res.render('applicant-details',{username: req.user.username});
        res.render('oldstudents');
        //res.sendFile(path.join(__dirname + '/../pages/loginpage.html'));
    });
    return router;
}
