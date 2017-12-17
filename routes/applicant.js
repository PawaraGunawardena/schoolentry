var express = require('express');
var db = require('../config/db');
var schoolmodel = require('../models/applicant');

module.exports = function(app, express, pool, applicantmodel){

    var router = express.Router();

    router.get('/view_applicant', function(req, res){
        console.log("sadsd");
    });

    router.get('/view_applicant_details', function (req, res, next) {
        res.render('view-applicant-details');
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

    return router;
}