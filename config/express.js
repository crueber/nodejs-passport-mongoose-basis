var express = require('express');
var passport = require('passport');

module.exports = function (app) {
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser(app.get('secret')));
  app.use(express.session({ secret: app.get('secret') }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(function (req, res, next) { res.locals.site_title = app.get('title'); next(); })
  app.use(app.router);
  app.use(require('connect-assets')({buildDir: false, src: __dirname + '/../assets'}))
  app.use(require('stylus').middleware(__dirname + '/../assets'));
  app.use(express.static(__dirname + '/../public'));

  if ('development' == app.get('env')) {
    app.use(express.errorHandler());
  }
}
