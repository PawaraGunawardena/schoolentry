var db = require('../config/db');
var bcrypt = require('bcryptjs');

exports.insert = function(username, password, done){

    bcrypt.hash(password, 8, function (err, hash) {

        var user = {username: username, password: hash};

        db.pool.getConnection(function (err, connection) {
            if (err) throw err;
            var query = connection.query('INSERT INTO users SET ?', user, function (error, results) {
                if(error) throw error;
            });
            console.log(query.sql);
            console.log('Users Inserted!');
            connection.release();
        });

    });

};
