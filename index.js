// Bootstrap Express...
var express   = require('express');
var app       = express();
global.logger = require('./config/logger')(app);
require('./config/globals')(app);

// Bootstrap all database connections and models...
var mongoose = require('mongoose');
var models   = require('./models');
var client   = mongoose.connect(app.get('mongo'), { server: { poolSize: 5 }})

// Configure passport, express, and routes...
require('./config/passport')(app)
require('./config/express')(app)
require('./config/routes')(app)

// Start the app...
app.listen(app.get('port'), function() {
    console.log('Listening on port %d', app.get('port'));
});
