
/*
 * GET users listing.
 */
var userData = require( '../model/users' );
var emailer = require( './emailer' );

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
            // send email first
            emailer.sendMail( 
                newUser, 
                "Bienvenido a Baby Lotto", 
                "Bienvenido a Baby Lotto, el lugar donde puede apostar por la fecha de nacimiento de las nuevas adiciones a la Family.\n" + 
                "El premio será un pisco gran Nobel a beber junto a los padres y los silleteros en una fecha a determinar.\n" +
                "Por favor entre a TBD para hacer sus apuestas y conocer las reglas.\n" + 
                "Saludos, y suerte\n" +
                "Equipo de Baby Lotto (APP)",
                "<b>Bienvenido a Baby Lotto</b>, el lugar donde puede apostar por la fecha de nacimiento de las nuevas adiciones a la Family.<br/>" +
                "El premio será un pisco Gran Nobel (a menos que gane la Gloria) a beber junto a los padres y los silleteros de siempre en una fecha y lugar a determinar.<br/>" + 
                "Por favor entre a TBD para hacer sus apuestas y conocer las reglas.<br/>" +
                "Saludos, y suerte<br/>" + 
                "Equipo de Baby Lotto (APP)"
            );
            res.render( 'userInserted', {
            title: 'New User',
            pagetitle: 'Hello there',
            user: newUser
            });
        }
    });
};
