'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/hstation-dev'
  },
  serialport: '/dev/tty.usbmodem1411', // Serial com port for the mac
  seedDB: true
};
