'use strict';

/**
 JOB DEFINITIONS
 Definitions for sensor jobs to be run by agenda
 https://github.com/rschmukler/agenda
 **/

var winston = require('./../winston');
var config = require('./../environment');

module.exports = function(agenda) {

  agenda.define(config.sensors.humidity.agenda_job_name, function(job, done) {
    console.log('Request humidity');
    done();
  });

  agenda.define(config.sensors.pressure.agenda_job_name, function(job, done) {
    console.log('Request pressure');
    done();
  });

  agenda.define(config.sensors.temperature.agenda_job_name, function(job, done) {
    console.log('Request temperature');
    done();
  });

  agenda.define(config.sensors.dewpoint.agenda_job_name, function(job, done) {
    console.log('Request dew point');
    done();
  });


}
