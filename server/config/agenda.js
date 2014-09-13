'use strict';

/**
 SCHEDULED TASKS
 https://github.com/rschmukler/agenda
 **/

var Agenda = require('agenda');
var winston = require('./winston');
var config = require('./environment');
var agendas = require('./../api/agenda/agenda.model');

// Agenda settings
var agenda = new Agenda({
  db: {
    address: config.mongo.uri,
    collection: 'agenda-jobs'
  }
});

// Load agendas from the database
agendas.find(function (err, jobs) {

  // Check to see if we returned an error
  if (err) {
    winston('angeda.js error: ' + err);
  }

  // Else there must be no errors so process jobs queue
  else {

    // Iterate over jobs array
    for (var key in jobs) {
      if (jobs.hasOwnProperty(key)) {

        // Only add agenda job if it is active
        if (jobs[key].active) {

          agenda.define(jobs[key].sensor, function (job, done) {
            console.log('send command: ' + jobs[key].command);
            done();
          });
          agenda.schedule(jobs[key].interval, jobs[key].sensor, {time: new Date()});

          winston.info('Added job \'' + jobs[key].sensor + '\' to agenda queue');
        }
      }
    }

    // Start the agenda jobs
    agenda.start();
  }

});
