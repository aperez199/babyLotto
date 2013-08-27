
/*
 * GET home page.
 */
var userData = require( '../model/users' );

exports.index = function( req, res ) {
    if( req.session.user_id ) {
        res.render( 'menu' );
    } else {
        res.render('index', {
            title: 'Baby Lotto'
        });
    }
};

exports.login = function( req, res ) {
    if( req.body.username === '' || req.body.password === '' ) {
        res.render( 'badLogin', {
            title: 'Error'
        });
        return;
    }
    userData.login( req.body.username, function( err, user ) {
        if( err ) console.log( err );
        else {
            console.log( "type: " + typeof( user ));
            if( typeof( user ) === 'undefined' ) {
                res.render( 'badLogin' );
            }
            else if( req.body.password == user.password ) {
                req.session.user_id = user._id;
                res.render( 'menu' );
            } else {
                res.render( 'badLogin' );
            }
        }
    });
};

exports.logout = function( req, res ) {
    console.log( 'logging out user: ' + req.session.user_id );
    req.session.user_id = '';
    res.redirect( '/' );
}