var mongoose = require('mongoose');

exports.list = function list(callback) {
    var Baby = mongoose.model('Baby');
    Baby.find({}, function (err, babies) {
        if(err){
            console.log(err);
        } else {
            console.log(babies);
            callback("",babies);
        }
    });
};

exports.insert = function(callback){
    var Baby = mongoose.model('Baby');
    var newBaby = new Baby({ babyName: 'Isabella', _parents: ['520941cdfa0570bd7d000002', '520943bd44dd9b580c000002'], expectedDate: '09/07/2013'});
    newBaby.save(function(err) {
        if(err) console.log(err);
        else {
            console.log('New baby ' + newBaby.babyName + ' saved in the database');
            callback( "", newBaby );
        }
    });
};

exports.create = function( req, callback ) {
    var Baby = mongoose.model( 'Baby' );
    var newBaby = new Baby( {
        babyName: req.body.babyName,
        parents: req.body.parents,
        expectedDate: req.body.expectedDate
    });
    newBaby.save( function( err ) {
        if( err ) console.log( err );
        else {
            console.log( 'New baby ' + newBaby.babyName + ' saved in the db' );
            callback( "", newBaby );
        }
    });
};

exports.get = function( babyId, callback ) {
    var Baby = mongoose.model( 'Baby' );
    Baby.findById( babyId, function( err, baby ) {
        if( err ) console.log( err );
        else {
            console.log( 'Baby found: ' + baby + ' for corresponding ID: ' + babyId );
            callback("", baby);
        }
    });
};