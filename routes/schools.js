var express = require('express');
var db = require('../config/db');
var schoolmodel = require('../models/school');

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
        //     buddhism_percentage: app.locals.guardian.school_buddhism,
        //     christianity_percentage: app.locals.guardian.school_christianity,
        //     islam_percentage: app.locals.guardian.school_islamic,
        //     Hindu_percentage: app.locals.guardian.school_hindu,
        //     religion_others_percentage: app.locals.guardian.guardian_nic_no
        // };



        console.log(school.name);
        schoolmodel.insert(school,pool);
        // res.render('applicant-details',{username: req.user.username});
        res.redirect('/school_details')
    });

    return router;
}
