
/*
 * GET home page.
 */

exports.index = function(req, res){
    res.render('testajax', {
        title: 'Test web page on node.js using Express and Mongoose',
        pagetitle: 'Hello there',
    });
};
