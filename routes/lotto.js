var lottoData = require( '../model/lottos' );
var babyData = require( '../model/babies' );
var userData = require( '../model/users' );
var moment = require( 'moment' );

exports.index = function(req, res){
    lottoData.list( function( err, lottoList ) {
        var babies = {};
        var users = {};
        babyData.list( function( err, babyList ) {
            for( var baby in babyList ) {
                babies[babyList[baby]._id] = babyList[baby].babyName;
            }
            userData.list( function( err, userList ) {
                for( var user in userList ) {
                    users[userList[user]._id] = userList[user].username;
                }
                res.render( 'lottos', {
                    title: 'Lotto',
                    pagetitle: 'Hello there',
                    lottos: lottoList,
                    moment: moment,
                    babies: babies,
                    users: users
                } );
            });
        
        });
    } );
};

exports.insert = function( req, res ) {
    if( req.session.user_id ) {
        var browser = req.headers['user-agent'];
        console.log( "browser: " + browser );
        if( browser.search( "Firefox" ) > -1 || browser.search( "MSIE" ) > -1) {
            var crappyBrowser = true;
        }
        if( crappyBrowser ) console.log( "Crappy browser")
        else console.log( "Good browser" );
        babyData.list( function( err, list ) {
            res.render( 'lottoInsert', {
                babies: list,
                crappyBrowser: crappyBrowser
            });
        });
    } else {
        res.render('index', {});
    }
};

exports.create = function( req, res ) {
    lottoData.create( req, function( err, newLotto ) {
        console.log( "type: " + typeof( newLotto._babyId ) );
        if( typeof( newLotto._babyId ) === 'undefined' ) {
            console.log( "ERROR: " + newLotto );
            res.render( 'lottoError', {} );
        } else {
                babyData.get( newLotto._babyId, function( err, baby ) {
                    if( err ) console.log( err );
                    else {
                        console.log( 'BabyId: ' + newLotto._babyId );
                        console.log( 'expectedDate: ' + newLotto.date );
                        console.log( 'username: ' + newLotto._userId );
                        res.render( 'lottoInserted', {
                            title: 'Nueva Apuesta',
                            pagetitle: 'Hello there',
                            date: newLotto.date,
                            baby: baby,
                            moment: moment
                        });
                    }
            });
        }
    });
};