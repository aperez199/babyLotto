var mongoose = require('mongoose');

exports.list = function list(callback) {
    var User = mongoose.model('User');
    User.find({}, function (err, users) {
        if(err){
            console.log(err);
        } else {
            console.log("users: " + users);
            callback("",users);
        }
    })
}

exports.insert = function(callback) {
    var User = mongoose.model('User');
    var newUser = new User( { username: 'Adrian', password: 'p4ssword', email: 'aperez199@gmail.com'} );
    newUser.save(function(err) {
        if(err) console.log(err);
        else {
            console.log('New user ' + newUser.username + ' saved in the db');
            callback( "", newUser );
       }
    });
};

exports.create = function( req, callback ) {
    var User = mongoose.model( 'User' );
    var newUser = new User( {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    });
    newUser.save( function( err ) {
        if( err ) console.log( err );
        else {
            console.log( 'New user ' + newUser.username + ' saved in the db' );
            callback( "", newUser );
        }
    });
};

exports.login = function( username, callback ) {
    var User = mongoose.model( 'User' );
    User.findOne( { username: username }, function( err, user ) {
        if( err ) console.log( err );
        else {
            console.log( 'Username ' + username + ' found. Password sent' );
            callback( "", user );
        }
    })
}