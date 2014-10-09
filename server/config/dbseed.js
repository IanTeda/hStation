'use strict';
/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

var Agenda = require('agenda');
var config = require('./environment');
var winston = require('./winston');
var agenda_options = {
  db: {
    address: config.mongo.uri,
    collection: 'agenda-jobs'
  }
};

// Agenda settings
var agenda = new Agenda(agenda_options);

// Get Agenda jobs
agenda.jobs({}, function (err, jobs) {

  // Check if there is an error in the callback
  if (err) {
    winston.error('Error in /server/config/dbseed.js ' + err);

  // Else there are no errors
  } else {

    // Check if the jobs callback is empty
    if (jobs <= 0) {

      // New Agenda job for humidity sensor
      agenda.define('humidity', function (job, done) {
        console.log('check HUMIDITY');
        done();
      });

      // New Agenda job for temperature sensor
      agenda.define('temperature', function (job, done) {
        console.log('check TEMPERATURE');
        done();
      });

      // New Agenda job for dew point sensor
      agenda.define('dewpoint', function (job, done) {
        console.log('check DEWPOINT');
        done();
      });

      // New Agenda job for pressure sensor
      agenda.define('pressure', function (job, done) {
        console.log('check PRESSURE');
        done();
      });

      // Set schedule for Agenda jobs
      agenda.schedule(config.agenda.default.interval, 'humidity', {time: new Date()});
      agenda.schedule(config.agenda.default.interval, 'temperature', {time: new Date()});
      agenda.schedule(config.agenda.default.interval, 'dewpoint', {time: new Date()});
      agenda.schedule(config.agenda.default.interval, 'pressure', {time: new Date()});

      // Start Agenda jobs
      agenda.start();

      winston.info('Agenda jobs where empty, so I added default agenda');

    }
  }
});

// Add default user if DB schema is empty
var User = require('../api/user/user.model');
User.seedIfEmpty();

// Add default settings if DB schema is empty
var Settings = require('../api/settings/settings.model');
Settings.seedIfEmpty();