var mysql = require('mysql')
    , async = require('async');

var PRODUCTION_DB = 'schooldbms'
    , TEST_DB = 'schooldbms';

/*
Connection Pooling
------------------

* Establishing connections everytime a query is executed is an expensive operation.

* Application Server enables administrators to establish a pool of backend connections
that applications can share on an application server

* This was initially a technique used in JDBC.

* Since NodeJs is the major player in the web-industry these days, it was introduced inside the mysql driver
in Node Packages.

-Author: Dasun Pubudumal

 */

exports. pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: null,
    database: PRODUCTION_DB
});
