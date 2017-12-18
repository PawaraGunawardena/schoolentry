var express = require('express');
var db = require('../config/db');
var usermodel = require('../models/users');
var schoolusermodel=require('../models/schooluser');
var schoolmodel=require('../models/school');
var applicantmodel=require('../models/applicant');
var oldstudentmodel=require('../models/oldstudents')

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
                    var marksForDistance;
                    if(rows[0].distance < 5){
                        marksForDistance = 20;
                    }else if(rows[0].distance < 10){
                        marksForDistance = 10;
                    }else{
                        marksForDistance = 5 ;
                    }

                    console.log(marksForDistance);
                    res.render('enter-marks',{applicant_id:rows[0].applicant_id,medium:rows[0].medium,distance:rows[0].distance,school_id:rows[0].school_id,marks_for_distance:marksForDistance});
                }

            });
        });


            //res.redirect('/users/userprofile/' + req.user.username);f
    });

    router.get('/selecting_applicant', function (req, res, next) {
        res.render('selecting-applicant');
    });

    router.get('/view_selected_list',function (req, res, next){
        max_limit=0;
        schoolmodel.getvacancies(req.user.username,pool).then(function (rows) {
            console.log(rows[0]);
            console.log(req.user.username);
            max_limit= rows[0].max_value_of_grade_one_entries;
        });
        console.log(max_limit)

        res.render('selected-list');
    });

    router.post('/enter_marks', function(req,res,next) {
        marksForSibling=parseInt(0);
        oldstudentmodel.getOldStudentID(req.body.sibling_id,pool).then(function (rows) {
            if(rows[0]==null){
                marksForSibling=0;
            }
            else{
                marksForSibling=15;
            }
        });
        console.log(marksForSibling);
        var totalMarks = parseInt(req.body.marks_for_distance) + parseInt(marksForSibling) + parseInt(req.body.marks_for_documents);
        var interview_marks = {
            applicant_id: req.body.applicant_id,
            medium: req.body.medium,
            distance: req.body.distance,
            school_id: req.body.school_id,
            marks_for_distance: req.body.marks_for_distance,
            marks_for_old_reference_student: marksForSibling,
            marks_for_documents: req.body.marks_for_documents,
            total_marks: totalMarks
        };
        applicantmodel.insertApplicantInterviewMarks(interview_marks,pool);

        res.redirect('/users/userprofile/' + req.user.username);
    });

return router;
};