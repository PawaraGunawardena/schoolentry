var express = require('express');
var router = express.Router();
var path = require('path');

module.exports = function (app, express, passport, pool, usermodel, LocalStrategy) {

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
            nic: req.body.nic,
            fname: req.body.fname,
            lname: req.body.lname,
            dob: req.body.dob,
            age: req.body.age,
            nationality: req.body.nationality,
            religion: req.body.religion,
            gender: req.body.gender,
            home_no: req.body.home_no,
            street: req.body.street,
            town: req.body.town,
            city: req.body.city,
            res_distr: req.body.res_distr,
            province: req.body.province,
            div_sec_area: req.body.div_sec_area,
            grama_nil_div: req.body.grama_nil_div,
            occupation: req.body.occupation,
            civil_status: req.body.civil_status
        };
        usermodel.insert(guardian);
        res.redirect('/applicant-details');
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

