
/*
 * GET rules page.
 */
 
exports.rules = function( req, res ) {
    res.render( 'rules', {} );
};

exports.winners = function( req, res ) {
    res.render( 'winners', {} );
}