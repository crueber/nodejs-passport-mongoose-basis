"use strict"

var path = require('path'),
    fs = require('fs'),
    files = fs.readdirSync(__dirname);

var mongoose = require('mongoose');
var User = mongoose.model('User')

// General Routes
exports.index = function (req, res) {
  if (!req.isAuthenticated()) return res.redirect('/welcome');
  res.render('index', { user: req.user });  
}

exports.welcome = function (req, res) { 
  if (req.isAuthenticated()) return res.redirect('/')
  res.render('welcome'); 
}

// All other route files...
var excludes = ['index'];
files.forEach(function(file) {
    var name = path.basename(file, '.js');
    if (excludes.indexOf(name) != -1) return;

    logger.info('Loading route file: ' + name);
    exports[name.toLowerCase()] = require('./' + name);
});
logger.info('Finished loading routes.')
