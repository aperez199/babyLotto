
/*
 * GET users listing.
 */
var userData = require( '../model/users' );

exports.index = function(req, res){
    userData.list( function( err, list ) {
        res.render( 'users', {
            title: 'Users',
            pagetitle: 'Hello there',
            users: list
        } );
    } );
};

exports.insert = function( req, res ) {
    res.render( 'userInsert', {
        title: 'New User',
        pagetitle: 'Hello there',
    });
};

exports.create = function( req, res ) {
    console.log( "body: " + req.body);
    userData.create( req, function( err, newUser ) {
        if( err ) console.log( err );
        else {
            res.render( 'userInserted', {
            title: 'New User',
            pagetitle: 'Hello there',
            user: newUser
            });
        }
    });
};
