var db = require('../config/db');
var bcrypt = require('bcryptjs');
var mysqlJson = require('mysql-json');
var async = require('async');
/*
Usual query injections
-----------------------
=================================================================================================
connection.query('SELECT * FROM users', function (error, results, fields) {
    console.log(results);
});

You can enter a JSON object into the database. Refer to the following example.

var query = connection.query('INSERT INTO users  SET ?', user, function(error, results, fields){
    if(error) throw error;
});
console.log(query.sql);

@Author - Dasun Pubudumal
==================================================================================================
 */

 /*
For information about Javascript Promises - https://developers.google.com/web/fundamentals/primers/promises
OR refer to the documentation of our Github repository.
 */

//Add new users.
exports.insert = function(id ,username, password, user_type,email,able_to_access, pool, done){
    bcrypt.hash(password, 8, function (err, hash) {
        var user = {id:id, username: username, password: hash, user_type: user_type,email: email,able_to_access: able_to_access};
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            var query = connection.query('INSERT INTO users SET ?', user, function (error, results) {
                if(error) throw error;
            });
            console.log('Insert query: ' + query.sql);
            console.log('Users Inserted!');

            // if(user_type == 'moe_officer'){
            //     var moe_officer = {
            //         officer_moe_id:
            //         id, post: 'moe_officer',
            //         first_name: first_name,
            //         last_name: last_name,
            //         date_of_birth: dob,
            //         nationality: nationality,
            //         religion: religion,
            //         gender: gender
            //     };
            //     var query2 = connection.query('INSERT INTO officer_ministry_of_education SET ?', moe_officer, function (err, results) {
            //        if(err) throw err;
            //     });
            // };

            connection.release();
        });
    });
};

//Remove users.
exports.remove = function (username, pool, done) {
   pool.getConnection(function (err, connection) {
        if(err) throw err;
        var query = connection.query('DELETE FROM users WHERE username = ?', username, function (error, results) {
            if(error) throw error;
        });
        console.log('Delete query: ', query );
        console.log('Users deleted!');
    })
};

//Update user profiles.
exports.update = function (oldusername, username, password, pool, done) {
    bcrypt.hash(password, 8, function (err, hash) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            var query = connection.query('UPDATE users SET username = ?, password = ? WHERE username = ?', [username, hash, oldusername], function (error, results) {
                if(error) throw error;
            });
            console.log('Update query: ' + query.sql);
            console.log('Users updated!');
            connection.release();
        });
    });
};

// This query is not that much important.
//This query was written just to take an idea on how to convert a SELECT query into a JSON format.
exports.view = function (pool, done) {
    pool.getConnection(function (err,  connection) {
        if(err) throw err;
        var query = connection.query('SELECT id, username FROM users', function (error, results) {
            console.log(JSON.stringify(results));
        });
        console.log('Select query: ' + query.sql);
        console.log('Users viewed!');
        connection.release();

    });
};

//Promise based functionality for data retrievals from the db.
exports.getUserType = function (username, pool) {
  return new Promise(fn);
  function fn(resolve, reject) {
      pool.getConnection(function (error, connection) {
         if(error){
             return reject(error)
         }else {
             connection.query('SELECT * FROM users WHERE username = ?',username, function (err, rows) {
                 if(err) {
                     return reject(err);
                 }else {
                     connection.release();
                     return resolve(rows);
                 }
             })
         }
      });
  }
};

//This is a test function.
exports.test = function (username, done) {
   pool.getConnection(function (err, connection) {
        if(err) throw err;
        var query = connection.query('SELECT * FROM users WHERE username = ?', username, function (error, rows) {
           console.log('Password is: ' + rows[0].password); //This will return the password.
        });
    });
};
