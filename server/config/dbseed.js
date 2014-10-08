'use strict';
/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

var Agenda = require('agenda');
var config = require('./environment');
var winston = require('./winston');

// Agenda settings
var agenda = new Agenda({
  db: {
    address: config.mongo.uri,
    collection: 'agenda-jobs'
  }
});

agenda.jobs({}, function (err, jobs) {
  if (err) {
    winston.error('Error in /server/config/dbseed.js ' + err);
  } else {
    if (jobs <= 0) {
      console.log('Jobs empty');

      agenda.define('humidity', function (job, done) {
        console.log('check HUMIDITY');
        done();
      });

      agenda.define('temperature', function (job, done) {
        console.log('check TEMPERATURE');
        done();
      });

      agenda.define('dewpoint', function (job, done) {
        console.log('check DEWPOINT');
        done();
      });

      agenda.define('pressure', function (job, done) {
        console.log('check PRESSURE');
        done();
      });

      agenda.schedule(config.agenda.default.interval, 'humidity', {time: new Date()});
      agenda.schedule(config.agenda.default.interval, 'temperature', {time: new Date()});
      agenda.schedule(config.agenda.default.interval, 'dewpoint', {time: new Date()});
      agenda.schedule(config.agenda.default.interval, 'pressure', {time: new Date()});

      agenda.start();

      winston.info('Agenda jobs where empty, so I added default agenda');

    }
  }
  ;
});

// Add default user if DB schema is empty
var User = require('../api/user/user.model');
User.seedIfEmpty();

// Add default settings if DB schema is empty
var Settings = require('../api/settings/settings.model');
Settings.seedIfEmpty();

// Add default agenda if DB schema is empty
//var Agenda = require('../api/agenda/agenda.model');
//Agenda.seedIfEmpty();