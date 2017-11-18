var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.render('schoolindex');
});

module.exports = router;