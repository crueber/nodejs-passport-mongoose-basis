
module.exports = function (app) {
  app.set('port', process.env['NODE_PORT'] || 4000);
  app.set('views', __dirname + '/../views');
  app.set('view engine', 'jade');
  app.set('title', 'Your App')
  app.set('secret', 'thisismyapp')
  app.set('mongo', process.env['MONGO_DB'] || 'mongodb://localhost/temporary')
  app.set('env',   process.env['NODE_ENV'] || 'development')
}
