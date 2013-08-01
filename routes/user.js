var passport = require('passport');
var User = require('mongoose').model('User');

exports.account = function(req, res) { res.render('account', {user: req.user}); }

exports.login = function(req, res) { res.render('login', { user: req.user, messages: req.session.messages }); }

exports.do_login = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) return next(err);
    if (!user) {
      req.session.messages = [info.message];
      return res.redirect('/login');
    }

    req.logIn(user, function(err) {
      if (err) return next(err);
      return res.redirect('/');
    });
  })(req, res, next);
}

exports.register = function(req, res) {
  res.render('register');
}

exports.do_register = function(req, res, next) { 
  var username = req.body.username,
      password = req.body.password,
      pwconf = req.body.pwconf,
      email = req.body.email;

  if (password != pwconf) {
    res.session.messages = ['Password confirmation incorrect.'];
    return next(true);
  }

  User.exists(username, function(already_exists) {
    if (already_exists) {
      res.session.messages = ['Username already exists.'];
      return next(true);
    }

    new_user = new User({
      username: req.body.username, 
      email: req.body.email, 
      password: req.body.password});

    new_user.save(function(err) {
      if(err) return next(err);
      req.logIn(new_user, function(err) {
        if (err) return next(err);
        console.log('logged in!');
        return res.redirect('/account');
      });
    });
  });
}

exports.admin = function(req, res) { res.send('you are an admin!'); }

exports.logout = function(req, res) { req.logout(); res.redirect('/'); }