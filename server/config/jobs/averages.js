'use strict';

/**
 JOB DEFINITIONS FOR CALCULATING AVERAGES
 Definitions for sensor jobs to be run by agenda
 https://github.com/rschmukler/agenda
 **/

var winston = require('./../winston');
var config = require('./../environment');

module.exports = function(agenda) {

  agenda.define('hourly averages', function (job, done) {

    //TODO: Retrive and calculate average every hour on the hour

    // Done with Agenda Job
    done();
  });

  agenda.define('daily averages', function (job, done) {

    //TODO: Retrive and calculate averages for the day every day

    // Done with Agenda Job
    done();
  });
};

