var express = require('express');
var db = require('../config/db');
var schoolmodel = require('../models/applicant');

module.exports = function(app, express, pool, applicantmodel){

    var router = express.Router();

    router.get('/view_applicant', function(req, res){
        console.log("sadsd");
    });

    router.get('/view_applicant_details', function (req, res, next) {
        res.render('view-applicant-details', {
                title: 'Applicant Details',
                username: req.user.username //Important
            }
        );
    });

    router.post('/view_applicant', function (req, res, next) {
        console.log("Guardian NIC: " + req.body.guardian_nic);
    });

    return router;
}