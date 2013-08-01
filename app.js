var MONGO_DB = process.env['MONGO_DB'] || 'mongodb://localhost/altonimbus2'
var ENV = process.env['NODE_ENV'] || 'development'
var PORT = process.env['ALTONIMBUS_PORT'] || 4000

/**
 * Module dependencies.
 */

var express     = require('express');
var mongoose     = require('mongoose');
var models       = require('./models');
var User = mongoose.model('User')

var routes       = require('./routes'),
    user_routes  = require('./routes/user'),
    http         = require('http'),
    path         = require('path'),
    passport     = require('passport');

mongoose.connect(MONGO_DB, { server: { poolSize: 5 }})

var app = express();

app.configure(function() {
  app.set('port', PORT);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('nodejs-passport-mongoose-basis'));
  app.use(express.session({ secret: 'nodejs-passport-mongoose-basis' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(require('connect-assets')({buildDir: false, src: __dirname + '/assets'}))
  app.use(require('stylus').middleware(__dirname + '/assets'));
  app.use(express.static(path.join(__dirname, 'assets')));

  if ('development' == app.get('env')) {
    app.use(express.errorHandler());
  }
});

app.get('/', routes.index);
app.get('/account', User.ensureAuthenticated, user_routes.account);
app.get('/admin', User.ensureAdmin, user_routes.admin);

app.get('/login', user_routes.login);
app.post('/login', user_routes.do_login);
app.get('/register', user_routes.register);
app.post('/register', user_routes.do_register);
app.get('/logout', user_routes.logout);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});



