'use strict';

/**
 JOB DEFINITIONS
 Definitions for sensor jobs to be run by agenda
 https://github.com/rschmukler/agenda
 **/

var Sensor = require('./../../api/humidity/sensor.model');


module.exports = function(agenda) {

  agenda.define('get sensor readings', function (job, done) {

    Sensor.create()

    // Done with Agenda Job
    done();
  });

}