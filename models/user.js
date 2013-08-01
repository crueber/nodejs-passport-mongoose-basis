var mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    passport = require('passport'), 
    LocalStrategy = require('passport-local').Strategy
    SALT_WORK_FACTOR = 10;

var Schema   = mongoose.Schema, 
    ObjectId = mongoose.Schema.ObjectId;

var UserSchema = new Schema({
  username: { type: String,  required: true, unique: true },
  email:    { type: String,  required: true, unique: true },
  password: { type: String,  required: true },
  admin:    { type: Boolean, required: false, default: false }
});

UserSchema.pre('save', function(next) {
  var user = this;

  if(!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if(err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash) {
      if(err) return next(err);
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function(candidatePassword, user, done) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if(err) return done(err);
    if(isMatch) return done(null, user);
    
    return done(null, false, { message: 'Invalid password' });
  });
};

UserSchema.statics.ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

UserSchema.statics.ensureAdmin = function(req, res, next) {
  if(req.isAuthenticated() && req.user && req.user.admin === true) next();
  res.send(403);
}

UserSchema.statics.exists = function(username, cb) {
  User.findOne({ username: username }, function(err, user) {
    if (user) return cb(true);
    return cb(false);
  });
}

User = mongoose.model('User', UserSchema);

passport.serializeUser(function(user, done) { done(null, user._id); });
passport.deserializeUser(function(id, done) { User.findById(id, function (err, user) { done(err, user); }); });

local_strategy = new LocalStrategy(function(username, password, done) {
  User.findOne({ username: username }, function(err, user) {
    if (err) return done(err);
    if (!user) {
      console.log ('hi');
      return done(null, false, { message: 'Unknown user ' + username });
    }

    user.comparePassword(password, user, done);
  });
});

passport.use(local_strategy);

exports = User;
