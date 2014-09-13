'use strict';

/**
 Database config and helper
 **/

var mongoose = require('mongoose');
var winston = require('./winston');
var config = require('./environment');

/**
 * Setup mongoose database instance
 */
// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);

/**
 * Listen for database connection events
 */
// Database connected
mongoose.connection.on('connected', function ()
{
  winston.info('Mongoose connection open to ' + config.mongo.uri);

  // Populate DB with sample data
  if(config.seedDB)
  {
    // Seed databse
    require('./dbseed');
  }
});

// On database connection error event
mongoose.connection.on('error', function (err)
{
  return winston.error('Mongoose connection error: ' + err);
});

// On database disconnected event
mongoose.connection.on('disconnected', function ()
{
  return winston.info('Mongoose disconnected');
});

// On databse sigint event
process.on('SIGINT', function ()
{
  return mongoose.connection.close(function () {
    winston.info('Mongoose disconnected through app termination');
    return process.exit(0);
  });
});