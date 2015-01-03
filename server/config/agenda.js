'use strict';

/**
 SCHEDULED TASKS
 https://github.com/rschmukler/agenda
 **/

var Agenda = require('agenda');
var winston = require('./winston');
var config = require('./environment');
var Settings = require('./../api/settings/settings.model');

// Agenda settings
var agenda = new Agenda({
  db: {
    address: config.mongo.uri,
    collection: 'agenda'
  }
});

// Agenda event to catch errors
agenda.on('fail', function(err, job) {
  winston.error('agenda.js error: ' + err);
});

// Remove all jobs to avoid starting mutliple jobs
agenda.purge(function(err, numRemoved) {
  winston.info('Purged jobs in Agenda que');
});

// Define agenda jobs
require('./jobs/weather')(agenda);

// Get the settings document and then scedule sensor readings
Settings.findOne({}, {}, { sort: { 'timestamp': 1 } }, function(err, settings){

  // Only start jobs if settings exist
  if (settings){
    // Schedule sensor readings
    agenda.every(settings.sensor_cron, [
      config.sensors.weather.agenda_job_name
    ]);
  };

});

// Start agenda scheduler
agenda.start();

module.exports = agenda;