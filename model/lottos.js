var mongoose = require('mongoose');

exports.list = function list(callback) {
    var Lotto = mongoose.model('Lotto');
    Lotto.find({}, function (err, lottos) {
        if(err){
            console.log(err);
        } else {
            console.log("lottos: " + lottos);
            callback("",lottos);
        }
    })
}

exports.create = function( req, callback ) {
    var Lotto = mongoose.model( 'Lotto' );
    console.log('req baby: ' + req.body.baby );
    console.log('req date: ' + req.body.selectedDate);
    var newLotto = new Lotto( {
        _userId: req.session.user_id, 
        _babyId: req.body.baby,
        date: req.body.selectedDate
    });
    newLotto.save( function( err ) {
        if( err ) console.log( err );
        else {
            console.log( 'New lotto for ' + newLotto._userId + ' saved in the db' );
            callback( "", newLotto );
        }
    });
};
