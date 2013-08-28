var mongoose = require('mongoose');
var moment = require( 'moment' );

exports.list = function list(callback) {
    var Lotto = mongoose.model('Lotto');
    Lotto.find( {}, null, {sort: { '_babyId': -1 }}, function (err, lottos) {
        if( err ){
            console.log( err );
        } else {
            console.log( "lottos: " + lottos );
            callback( "",lottos );
        }
    })
}

exports.create = function( req, callback ) {
    var Lotto = mongoose.model( 'Lotto' );
    console.log( 'req baby: ' + req.body.baby );
    console.log( 'req date: ' + req.body.selectedDate );

    var browser = req.headers['user-agent'];
    if( browser.search( "Firefox" ) > -1 || browser.search( "MSIE" ) > -1) {
        var crappyBrowser = true;
    }
    var newLotto = new Lotto( {
        _userId: req.session.user_id, 
        _babyId: req.body.baby,
        date: req.body.selectedDate
    });
    
    Lotto.findOne( { _userId: newLotto._userId, _babyId: newLotto._babyId }, function( err, lotto ) {
        if( err ) console.log( err );
        else {
            if( !lotto ) {
                lotto = new Lotto();
                lotto._userId = req.session.user_id;
                lotto._babyId = req.body.baby;
            }
            if( crappyBrowser ) {
                console.log( "BUG: " + moment( req.body.selectedDate + " +0000", 'MM/DD/YYYY Z' ).toISOString() );
                lotto.date = moment( req.body.selectedDate + " +0000", 'MM/DD/YYYY Z' ).toISOString();
            } else {
                lotto.date = req.body.selectedDate;
            }
            lotto.save( function( err ) {
                if( err ) {
                    callback( "", err );
                }
                else {
                    console.log( 'New lotto for baby ' + newLotto._babyId + ' by user ' + newLotto._userId );
                    callback( "", lotto );
                }
            });
        }
    });
};
