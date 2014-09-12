/*
  Database config and helper
 */
'use strict';

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
    require('./dbseed');
  }
});

// Database connection error
mongoose.connection.on('error', function (err) {
  return winston.error('Mongoose connection error: ' + err);
});

// Database disconnected
mongoose.connection.on('disconnected', function () {
  return winston.info('Mongoose disconnected');
});

// Database disconnected because app terminated
process.on('SIGINT', function () {
  return mongoose.connection.close(function () {
    winston.info('Mongoose disconnected through app termination');
    return process.exit(0);
  });
});