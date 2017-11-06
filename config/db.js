var mysql = require('mysql')
    , async = require('async');

var PRODUCTION_DB = 'schooldbms'
    , TEST_DB = 'schooldbms';

/*

 */

exports. pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: null,
    database: PRODUCTION_DB
});
