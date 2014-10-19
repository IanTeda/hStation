'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/hstation-dev'
  },

  // Default model values generated during first server start
  model_defaults : {
    settings : {
      sensor_cron : '*/1 * * * *'
    }
  },

  // Configuration for sensors when run in development environment
  sensors : {
    default_interval : 'every 1 minute'
  },

  seedDB : true
};
