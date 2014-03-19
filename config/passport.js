var passport = require('passport'), 
    GoogleStrategy = require('passport-google').Strategy;

var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = function (app) {
  passport.use(new GoogleStrategy({
      returnURL: 'http://localhost:4000/auth/google/return',
      realm: 'http://localhost:4000/'
    },
    function (identifier, profile, done) {
      User.findOrCreate({google_id: identifier}, function (err, user) {
        if (err) return done(err);

        user.google_profile = profile;
        user.save(logger.logErr);
        return done(null, user);
      })
    }
  ));  

  passport.serializeUser(function (user, done) { 
    done(null, user.id); 
  });

  passport.deserializeUser(function (id, done) { 
    User.findOne({_id: id}, done); 
  });
}
