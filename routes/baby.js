var babyData = require( '../model/babies' );
var moment = require( 'moment' );
moment.lang( 'es' );

exports.index = function(req, res) {
    if( req.session.user_id ) {
        babyData.list( function( err, list ) {
            res.render( 'babies', {
                title: 'Babies',
                pagetitle: 'Hello there',
                babies: list,
                moment: moment
            });
        });
    } else {
        res.redirect('/');
    }
};

exports.insert = function( req, res ) {
    res.render( 'babyInsert', {
        title: 'Insert new baby',
        pagetitle: 'Hello there'
    });
};

exports.create = function( req, res ) {
    babyData.create( req, function( err, newBaby ) {
        if( err ) console.log( err );
        else {
            res.render( 'babyInserted', {
            title: 'New Baby',
            pagetitle: 'Hello there',
            baby: newBaby,
            expectedDate: new Date( newBaby.expectedDate ).toDateString()
            });
        }
    });
};
