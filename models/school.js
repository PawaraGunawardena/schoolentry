var db = require('../config/db');

exports.insert = function(username, password, next) {

    //Password needs to be hashed.

    var values = [username, password];
    db.get().query('INSERT INTO users (username, password) VALUES(?, ?, ?)', 
    values, function(err, result){ 
        if(err) return next(err)
        next(null, result.insertId)
    })
}

exports.getAll = function(next){
    db.get().query('SELECT * FROM users', function(err, result){
        if(err) return next(err);
        next(null, result);
    })
}