'use strict';

var path = require('path');
var _ = require('lodash');

function requiredProcessEnv(name) {
  if(!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  // Server port
  port: process.env.PORT || 9000,

  // Should we populate the DB with sample data?
  seedDB: false,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'h-station-secret'
  },

  // List of user roles
  userRoles: ['guest', 'user', 'admin'],

  // MongoDB connection options
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  },

  // Default model values generated during first server start
  model_defaults : {
    settings : {
      serialport          : 'No serial port set',
      sensor_cron_running : false
    }
  },

  serialport : {
    // Default settings for communicating with the Arduino
    options : {
      baudrate: 9600,
      dataBits: 8,
      parity: 'none',
      stopBits: 1,
      flowControl: false
    }
  },

  // Configuration for sensors when run in all environments
  sensors: {
    weather : {
      agenda_job_name : 'get weather',
      command         : 'WEATHER'
    }
  }


};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {});