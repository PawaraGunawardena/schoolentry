var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
    res.sendFile(path.join(__dirname + '/../pages/index.html'));
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register' });
});

module.exports = router;
