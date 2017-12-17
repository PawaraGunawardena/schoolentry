var express = require('express');
var db = require('../config/db');
var schoolmodel = require('../models/school');
var path = require('path');

module.exports = function(app, express, pool, schoolmodel){
    var router = express.Router();
    //schools index route
    router.get('/', function(req, res){
        res.render('schoolindex');
    });

    router.post('/school_details', function (req, res, next) {
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
        schoolmodel.insert('0',
                            req.body.school_name,
                            req.body.school_postal,
                            req.body.school_road,
                            req.body.school_city,
                            req.body.province_dropdown,
                            req.body.school_max_students,
                            req.body.school_buddhism,
                            req.body.school_christianity,
                            req.body.school_islamic,
                            req.body.school_hindu,
                            req.body.school_others,
                            pool);
        // res.render('applicant-details',{username: req.user.username});
        res.redirect('/school');
        //res.sendFile(path.join(__dirname + '/../pages/loginpage.html'));
    });
    return router;
}
