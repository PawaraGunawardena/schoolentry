var express = require('express');
var db = require('../config/db');
var usermodel = require('../models/users');
var schoolusermodel=require('../models/schooluser');
var schoolmodel=require('../models/school');
var applicantmodel=require('../models/applicant');

module.exports = function (app,express,pool,usermodel,schoolmodel,schoolusermodel) {

    var router = express.Router();

    router.post('/select_applicant', function (req, res, next) {
        schoolmodel.getSchoolID(req.user.username, pool).then(function (uid) {
            applicantmodel.getApplicantIDfromAppliesSchool(req.body.applicant_id, req.body.medium,uid[0].school_id,pool).
            then(function(rows){
                console.log(rows[0]);
                if(rows[0]== null){
                    console.log('no applicant');
                    res.render('selecting-applicant');
                }else{
                    console.log('applicant detected');
                    res.render('enter-marks');
                }

            });
        });


            //res.redirect('/users/userprofile/' + req.user.username);
    });

    router.get('/selecting_applicant', function (req, res, next) {
        res.render('selecting-applicant');
    });

return router;
};