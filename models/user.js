var mongoose = require('mongoose');

var Schema   = mongoose.Schema;
var ObjectId = mongoose.Schema.ObjectId;
var Mixed    = Schema.Types.Mixed

var User = new Schema({
  google_id: { type: String, index: true },
  google_profile: { type: Mixed }
}, { strict: false });

// Middleware...
User.static('authed', function (req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
})

User.static('exists', function (username, cb) {
  User.findOne({ username: username }, function(err, user) {
    if (user) return cb(true);
    return cb(false);
  });
})

// Used for any passport 3rd party auth needs.
// How-to: User.findOrCreate({google_id: identification}, function (er, user) {})
User.static('findOrCreate', function (query, cb) {
  User.findOne(query, function (err, doc) {
    if (err) return cb(err)
    else if (!doc) User.create(query, cb)
    else cb(null, doc)
  })
})

User = exports = mongoose.model('User', User);
