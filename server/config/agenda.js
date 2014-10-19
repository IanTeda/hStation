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

// Agenda event to catch errors
agenda.on('fail', function(err, job) {
  winston.error("Job " + job.name + " failed with error: %s", err.message);
});

// Load agendas from the database
agendas.find(function (err, jobs) {

  // Check to see if we returned an error
  if (err) {
    winston('angeda.js error: ' + err);
  }

  // Else there must be no errors so process jobs queue
  else {

    // Remove all jobs in the database before adding to avoid mutliple jobs
    agenda.purge(function(err, numRemoved) {
      winston.info('Purged jobs in Agenda que');
    });

    // Iterate over jobs array adding as we go
    for (var key in jobs) {
      if (jobs.hasOwnProperty(key)) {

        // Only add agenda job if it is active
        if (jobs[key].active) {

          // Define agenda job
          agenda.define(jobs[key].name, function (job, done) {
            console.log('send command: ' + jobs[key].name);
            done;
          });
          agenda.schedule(jobs[key].interval, jobs[key].name, {time: new Date()});

          winston.info('Added job \'' + jobs[key].name + '\' to agenda queue ' + jobs[key].interval);
        }
      }
    }
    agenda.start();
  };

});