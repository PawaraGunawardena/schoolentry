var express = require('express');
var db = require('../config/db');
var schoolmodel = require('../models/school');

module.exports = function(app, express, schoolmodel){
    var router = express.Router();

    router.get('/', function(req, res){
        res.render('schoolindex');
    });

    return router;
}
