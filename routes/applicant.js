var express = require('express');
var db = require('../config/db');
var schoolmodel = require('../models/applicant');
var guardianmodel=require('../models/guardian');

module.exports = function(app, express, pool, applicantmodel){

    var router = express.Router();

    router.get('/view_applicant', function(req, res){
        console.log("sadsd");
    });

    router.get('/view_applicant_details', function (req, res, next) {
        res.render('view-applicant-details');
    });
    //this route is used to select a guardian and will proceed to relavant page after checcking guardian nic
    router.get('/enter_details', function (req, res, next) {
        res.render('get_guardian_nic');
    });

    router.post('/view_applicant', function (req, res, next) {
        console.log("Guardian NIC: " + req.body.guardian_nic);
        applicantmodel.getApplicantsForGuardian(req.body.guardian_nic,pool).then(function (rows){
            console.log(rows[0]);
            res.render('view-applicant-details',{rows:rows});
        }).catch(function (err) {
            console.log(err);
        });

    });
    //check whether there is an existing guardian
    router.post('/check_guardian_availability', function (req, res, next) {
        console.log("Guardian NIC: " + req.body.guardian_nic);
       guardianmodel.getGuardian(req.body.guardian_nic,pool).then(function (rows){
            console.log(rows[0]);
            if(rows[0]== null){
                console.log('no guardian');
                res.render('guardian-details',{nic:req.body.guardian_nic});
            }else{
                console.log('there are guardians');
                res.render('applicant-details');
            }
        }).catch(function (err) {
            console.log(err);
        });


    });

    return router;
}