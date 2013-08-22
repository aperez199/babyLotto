
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , db = require('./model/db')
  , path = require('path')
  , baby = require('./routes/baby')
  , lotto = require('./routes/lotto')
  , index = require('./routes/index');

var app = express();

app.use( express.cookieParser() );
app.use( express.session( { secret: 'yourmama' } ) );

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

app.get('/', index.index);
app.post('/login', index.login );
app.get('/logout', index.logout );
app.get('/users', user.index);
app.get('/admin', user.insert);
app.get('/babyInsert', baby.insert);
app.post('/babyCreate', baby.create);
app.get('/babies', baby.index);
app.post('/userCreate', user.create);
app.get('/lotto', lotto.insert);
app.post('/lottoCreate', lotto.create);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});