var passport = require('passport');
var mongoose = require('mongoose');

var User     = mongoose.model('User');

var routes = require('../routes');

module.exports = function (app) {

  app.get('/', routes.index);
  app.get('/welcome', routes.welcome)
  app.get('/auth/google', passport.authenticate('google', { failureRedirect: '/welcome', successRedirect: '/' }))
  app.get('/auth/google/return', passport.authenticate('google', { failureRedirect: '/welcome', successRedirect: '/' }))
  app.get('/auth/logout', User.authed, function (req, res) { req.logout(); res.redirect('/'); });

}
