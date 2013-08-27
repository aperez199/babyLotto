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
    console.log( 'req baby: ' + req.body.baby );
    console.log( 'req date: ' + req.body.selectedDate );
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
            lotto.date = req.body.selectedDate;
            lotto.save( function( err ) {
                if( err ) console.log( err );
                else {
                    console.log( 'New lotto for baby ' + newLotto._babyId + ' by user ' + newLotto._userId );
                    callback( "", lotto );
                }
            });
        }
    });
};
