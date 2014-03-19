var winston = require('winston')

module.exports = function (app) {
  var log_levels = {
    levels: { debug: 0, info: 1, warn: 2, error: 3, emerg: 4 },
    colors: { debug: 'grey', info: 'green', warn: 'yellow', error: 'red', emerg: 'red' } 
  }

  var console_transport = new (winston.transports.Console)({ level: 'debug', colorize: true, timestamp: true })
  var client = new (winston.Logger)({ levels: log_levels.levels, transports: [console_transport] })
  winston.addColors(log_levels.colors)

  client.logErr = function (error) { 
    if (error) client.error(error.message || 'error', error.stack || error) 
  }
  client.logErrAndExit = function (error) {
    if (error) {
      client.emerg(error.message || 'error', error.stack || error)
      setTimeout(process.exit, 2000, 1)
    }
  }

  return client
}
