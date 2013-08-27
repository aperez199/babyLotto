var lottoData = require( '../model/lottos' );
var babyData = require( '../model/babies' );
var moment = require( 'moment' );

exports.list = function(req, res){
    lottoData.list( function( err, list ) {
        res.render( 'lotto', {
            title: 'Lotto',
            pagetitle: 'Hello there',
            lotto: list
        } );
    } );
};

exports.insert = function( req, res ) {
    if( req.session.user_id ) {
        babyData.list( function( err, list ) {
            res.render( 'lottoInsert', {
                babies: list
            });
        });
    } else {
        res.render('index', {});
    }
};

exports.create = function( req, res ) {
    lottoData.create( req, function( err, newLotto ) {
        if( err ) console.log( err );
        else {
                console.log( 'BabyId: ' + newLotto._babyId );
                console.log( 'expectedDate: ' + newLotto.date );
                console.log( 'username: ' + newLotto._userId );
                babyData.get( newLotto._babyId, function( err, baby ) {
                    res.render( 'lottoInserted', {
                        title: 'Nueva Apuesta',
                        pagetitle: 'Hello there',
                        date: newLotto.date,
                        baby: baby,
                        moment: moment
                });
            });
        }
    });
};