'use strict';

/**
 AGENDA JOB FOR RETRIVING HUMIDITY
 https://github.com/rschmukler/agenda
 **/

var winston = require('./../winston');
var agendas = require('./../../api/agenda/agenda.model');

module.exports = function(agenda) {
  agenda.define('get humidity', function(job, done) {
    console.log('Request humidity');
  });

  agenda.define('get pressure', function(job, done) {
    console.log('Request pressure');
  });

  agenda.define('get temperature', function(job, done) {
    console.log('Request temperature');
  });

  agenda.define('get dew point', function(job, done) {
    console.log('Request dew point');
  });


}
