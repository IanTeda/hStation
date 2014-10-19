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
require('./jobs/sensors')(agenda);

// Get the settings document and then scedule sensor readings
Settings.findOne({}, {}, { sort: { 'timestamp': 1 } }, function(err, settinga){

  // Schedule sensor readings
  agenda.every(settinga.sensor_cron, [
    config.sensors.humidity.agenda_job_name,
    config.sensors.temperature.agenda_job_name,
    config.sensors.pressure.agenda_job_name,
    config.sensors.dewpoint.agenda_job_name
  ]);
})

// Start agenda scheduler
agenda.start();