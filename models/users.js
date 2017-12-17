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
exports.insert = function(username, password, user_type,email,able_to_access, pool, done){
    bcrypt.hash(password, 8, function (err, hash) {
        var user = {username: username, password: hash, user_type: user_type,email: email,able_to_access: able_to_access};
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            var query = connection.query('INSERT INTO users SET ?', user, function (error, results) {
                if(error) throw error;
            });
            console.log('Insert query: ' + query.sql);
            console.log('Users Inserted!');
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
exports.update = function (oldusername, newUsername, newpassword, currentpassword, enteredpassword, email, pool, done) {
    bcrypt.compare(enteredpassword, currentpassword, function(err, res){
        console.log(res);
        bcrypt.hash(newpassword, 8 , function(error, hash){
            if(error) throw err;
            if(res){
                pool.getConnection(function (err, connection) {
                    if (err) throw err;
                    var query = connection.query('UPDATE users SET username = ?, password = ?, email = ? WHERE username = ?', [newUsername, hash, email, oldusername], function (error, results) {
                        if(error) throw error;
                    });
                    console.log('Update query: ' + query.sql);
                    console.log('Users updated!');
                    connection.release();
                });
            }else{
                console.log('Password not correct!');   
            }
        });
    });
};

exports.remove = function(username, pool, done){
    //Make sure to verify that a user cannot remove himself.
    //Make sure he enters an existing user.
    pool.getConnection(function(err, connection){
        if(err) throw err;
        var query = connection.query('DELETE FROM users WHERE username = ?', username, function(error, results){
           if(error) throw error; 
        });
        console.log('Delete query: ' + query.sql);
        console.log('User deleted!');
    });
}

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
exports.getUserInfo = function (username, pool) {
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

//Promise based functionality for data retrievals from the db.
exports.getUserNames = function (pool) {
    return new Promise(fn);
    function fn(resolve, reject) {
        pool.getConnection(function (error, connection) {
            if(error){
                return reject(error)
            }else {
                connection.query('SELECT * FROM users',function (err, rows) {
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

exports.getSchoolID = function (schoolName, pool, done) {
    return new Promise(fn);
    function fn(resolve, reject) {
        pool.getConnection(function (error, connection) {
            if(error){
                return reject(error)
            }else {
                connection.query('SELECT * FROM school WHERE name=?', schoolName, function (err, rows) {
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

exports.getSchoolName = function (pool, done) {
    return new Promise(fn);
    function fn(resolve, reject) {
        pool.getConnection(function (error, connection) {
            if(error){
                return reject(error)
            }else {
                connection.query('SELECT * FROM school', function (err, rows) {
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

exports.insertSchool = function (username, post, school_id, pool) {
    var user = {officer_username: username, school_officer_post: post, school_id: school_id};
    pool.getConnection(function (err, connection) {
        if (err) throw err;
        var query = connection.query('INSERT INTO officer_school SET ?', user, function (error, results) {
            if(error) throw error;
        });
        console.log('Insert query: ' + query.sql);
        console.log('Users Inserted!');
        connection.release();
    });
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
