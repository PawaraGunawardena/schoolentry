var express = require('express');
var db = require('../config/db');
var oldstudentmodel = require('../models/oldstudents');
var oldstudentmodel1 = require('../models/oldstudents_school');
var guardianmodel = require('../models/guardian');
var schoolmodel = require('../models/school');
var path = require('path');

module.exports = function(app, express, pool, oldstudentmodel){
    var router = express.Router();
    //schools index route

    // router.get('/', function(req, res, next){
    //     res.render('oldstudents');
    // });

    router.get('/', function (req, res, next) {
        //console.log(req.bo.guardian_nic_no);
        // res.send('Check Console.')
        guardianmodel.getGuardianNIC(pool).then(function (rows) {
            res.render(
                'oldstudents', {
                    title: 'Applicant School Details',
                    // guardian: app.locals.guardian,
                    // applicant: app.locals.applicant,
                    dropdownValues: rows
                });
        });
        //res.redirect('/privileges');

    });

    // router.get('/old_student_details', function(req, res, next){
    //     //res.render('oldstudent_school');
    //     schoolmodel.getschoolName(pool).then(function (rows) {
    //         res.render(
    //             'old_student_details', {
    //                 title: 'Applicant School Details',
    //                 // guardian: app.locals.guardian,
    //                 // applicant: app.locals.applicant,
    //                 dropdownValues: rows
    //             });
    //     });
    // });

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

        schoolmodel.getschoolName(pool).then(function (rows) {
            res.render(
                'oldstudents_school', {
                    title: 'Applicant School Details',
                    adm_no:req.body.admission_no,
                    // guardian: app.locals.guardian,
                    // applicant: app.locals.applicant,
                    dropdownValues: rows
                });
        });
        // res.render('applicant-details',{username: req.user.username});
        //res.render('oldstudents_school',{adm_no:req.body.admission_no});
        //res.sendFile(path.join(__dirname + '/../pages/loginpage.html'));
    });

    router.post('/old_student_school_details', function (req, res, next) {
        oldstudentmodel1.insert(
            req.body.admission_no,
            req.body.name,
            req.body.date_of_admission,
            req.body.medium,
            pool);
        // res.render('applicant-details',{username: req.user.username});
        res.render('oldstudents');
        //res.sendFile(path.join(__dirname + '/../pages/loginpage.html'));
    });
    return router;
}
