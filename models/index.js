"use strict"

var path = require('path'),
    fs = require('fs'),
    files = fs.readdirSync(__dirname);

var excludes = ['index'];

files.forEach(function(file) {
    var name = path.basename(file, '.js');
    if (excludes.indexOf(name) != -1) return;

    logger.info('Loading model: ' + name);
    module.exports[name] = require('./' + name);
});
logger.info('Finished loading models.')
