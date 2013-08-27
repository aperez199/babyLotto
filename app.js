
/**
 * Module dependencies.
 */

var express = require( 'express' )
  , routes = require( './routes' )
  , user = require( './routes/user' )
  , http = require( 'http' )
  , db = require( './model/db' )
  , path = require( 'path' )
  , baby = require( './routes/baby' )
  , lotto = require( './routes/lotto' )
  , index = require( './routes/index' )
  , static = require( './routes/static' );

var app = express();

app.use( express.cookieParser() );
app.use( express.session( { secret: 'yourmama' } ) );
app.use( '/public', express.static( __dirname + "/public" ) );

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// GET
app.get( '/', index.index );
app.get( '/logout', index.logout );
app.get( '/users', user.index );
app.get( '/admin', user.insert );
app.get( '/babyInsert', baby.insert );
app.get( '/babies', baby.index );
app.get( '/bet', lotto.insert );
app.get( '/rules', static.rules );
app.get( '/winners', static.winners );
//app.get( '/lottos', lotto.index );

// POST
app.post( '/login', index.login );
app.post( '/babyCreate', baby.create );
app.post( '/userCreate', user.create );
app.post( '/lottoCreate', lotto.create );

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});