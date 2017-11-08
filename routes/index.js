var express = require('express');
var router = express.Router();
var path = require('path');

module.exports = function (app, express, passport, pool, usermodel, guardianmodel, LocalStrategy) {

    var router = express.Router();

    /* GET home page. */
    router.get('/', function (req, res, next) {
        // res.render('index', { title: 'Express' });
        res.sendFile(path.join(__dirname + '/../pages/home.html'));
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
        guardianmodel.insert(guardian,pool);
        res.render('applicant-details');
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

