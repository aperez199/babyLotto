var nodemailer = require( 'nodemailer' );

exports.sendMail = function( user, subject, message, message_html ) {
    
    var smtpTransport = nodemailer.createTransport( "SMTP", {
        service: "Gmail",
        auth: {
            user: "aperez199@gmail.com",
            pass: "mskg3lfmox"
        }
    });

    var mailOptions = {
        from: "Adrian Perez <aperez199@gmail.com>",
        to: user.email,
        subject: subject,
        text: message,
        html: message_html
    };
    
    smtpTransport.sendMail( mailOptions, function( err, response ) {
        if( err ) console.log( err );
        else {
            console.log( "Message sent: " + response.message );
        }
    });
    
    smtpTransport.close();
};