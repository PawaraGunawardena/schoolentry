var mysql = require('mysql')
    , async = require('async');

var PRODUCTION_DB = 'skul_admi'
    , TEST_DB = 'skul_admi';

/*
Connection Pooling
------------------

* Establishing connections everytime a query is executed is an expensive operation.

* Application Server enables administrators to establish a pool of backend connections
that applications can share on an application server

* It essentially creates a pool of database connections so that the user can get use of. This
speeds up the operation while giving a higher aspect of security. Response time is minimized. It is
said that the performance raises up to 20 times than that of normal db connection procedures.

* This was initially a technique used in JDBC.

* Since NodeJs is the major player in the web-industry these days, it was introduced inside the mysql driver
in Node Packages.

For more info, visit,

1. https://www.ibm.com/support/knowledgecenter/en/SSAW57_8.5.5/com.ibm.websphere.nd.doc/ae/cdat_conpool.html
2. http://geekexplains.blogspot.com/2008/06/what-is-connection-pooling-why-do-we.html


 */

exports. pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: null,
    database: PRODUCTION_DB
});
