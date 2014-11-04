/**
 * WINSTON LOGGER CONFIGURATION
 * https://github.com/flatiron/winston
 *
 * Usage:
 *   var winston = require('./config/winston');
 *   winston.<insert log level>('String to be logged');
 */

var winston = require('winston');
var envConfig = require('./environment');
var MongoDB = require('winston-mongodb').MongoDB;

// Logging levels and associated colors
var config = {
  levels: {
    silly: 0,
    verbose: 1,
    info: 2,
    data: 3,
    warn: 4,
    debug: 5,
    error: 6
  },
  colors: {
    silly: 'magenta',
    verbose: 'cyan',
    info: 'green',
    data: 'grey',
    warn: 'yellow',
    debug: 'blue',
    error: 'red'
  }
};

// New logger object
var wintson = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      colorize: true
    }),
    // Need the file transport so I can query the log. TODO: Really??
    new (winston.transports.File)({
      filename: require('os').hostname() + '.' + process.env.NODE_ENV + '.log'
    }),
    new (winston.transports.MongoDB)({
      dbUri: envConfig.mongo.uri,
      collection: 'log'
    })
  ],
  levels: config.levels,
  colors: config.colors
});

module.exports = wintson;