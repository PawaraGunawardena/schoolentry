var express = require('express');
var router = express.Router();
var path = require('path');

module.exports = function (app, express, passport, pool, usermodel, guardianmodel, applicantmodel, LocalStrategy) {

    var router = express.Router();

    /* GET home page. */
    router.get('/', function (req, res, next) {
        // res.render('index', { title: 'Express' });
        res.sendFile(path.join(__dirname + '/../pages/home.html'));
    });

    router.get('/applicant_details', function (req, res, next) {
        console.log(app.locals.guardian.guardian_nic_no);
        // res.send('Check Console.')
        res.render('applicant-details', {
            title: 'Applicant Details',
            guardian: app.locals.guardian
        });
    });

    router.post('/applicant_details', function (req, res, next) {

        var applicant = {

            applicant_id: req.body.applicant_id,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            date_of_birth: req.body.dob,
            // age: req.body.age,
            nationality: req.body.nationality,
            religion: req.body.religion,
            gender: req.body.gender,
            guardian_nic_no: req.body.guardian_nic
        };
        app.locals.applicant = applicant;
        console.log(applicant.date_of_birth);
        applicantmodel.insert(applicant,pool);
        // res.render('applicant-details',{username: req.user.username});
        res.redirect('/applicant_school_details')
    });

    router.get('/applicant_school_details', function (req, res, next) {
        //console.log(req.bo.guardian_nic_no);
        // res.send('Check Console.')
        applicantmodel.getSchoolName(pool).then(function (rows) {
            res.render('applicant-school-details', {
                title: 'Applicant School Details',
                guardian: app.locals.guardian,
                applicant: app.locals.applicant,
                dropdownValues: rows
            });
        });

    });

    router.post('/applicant_school_details', function (req, res, next) {
        applicantmodel.getSchoolID(req.body.school_name, pool).then(function (rows) {

            var appliedSchool = {
                applicant_id: app.locals.applicant.applicant_id,
                medium: req.body.medium,
                distance: req.body.distance_to_school,
                school_id: rows[0].school_id,
                category: req.body.category
            };
            applicantmodel.insertApplicantSchoolDetails(appliedSchool, pool);
        });

        res.redirect('/users/userprofile/' + req.user.username);
    });

    router.get('/register', function (req, res, next) {
        res.render('register', {title: 'Register'});
    });

    router.get('/guardian_details', authenticationMiddleware(), function (req, res, next) {
        res.render('guardian-details', {
                title: 'Guardian Details',
                username: req.user.username //Important
            }
        );
    });



    // router.get('/view_applicant_details', authenticationMiddleware(), function (req, res, next) {
    //     res.render('view-applicant-details', {
    //             title: 'Applicant Details',
    //             username: req.user.username //Important
    //         }
    //     );
    // });

    router.post('/guardian_details', function (req, res, next) {

        var guardian = {
            guardian_nic_no: req.body.guardian_nic,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            date_of_birth: req.body.dob,
            // age: req.body.age,
            nationality: req.body.nationality,
            religion: req.body.religion,
            gender: req.body.gender,
            Number_of_the_home: req.body.home_number,
            street: req.body.street,
            town: req.body.town,
            city: req.body.city,
            residential_district: req.body.district,
            province: req.body.province,
            divisional_secretary_area: req.body.divisional_secretary_area,
            grama_niladhari_division: req.body.grama_niladhari_division,
            occupation: req.body.occupation,
            civil_status: req.body.civil_status
        };
        app.locals.guardian = guardian;
        guardianmodel.insert(guardian,pool);
        // res.render('applicant-details',{username: req.user.username});
        res.redirect('/applicant_details');
    });

    router.get('/applicant_school_details', function (req, res, next) {
        applicantmodel.getSchoolName(pool).then(function(rows){

            res.render('applicant-school-details', {
                title: 'Applicant School Details',
                guardian: app.locals.guardian
            },{dropdownVals: rows});
        })
    });

    function authenticationMiddleware() {
        return function (req, res, next) {
            if (req.isAuthenticated()) {
                next();
            } else {
                res.send('User not verified!');
            }
        }
    }

    return router

};


