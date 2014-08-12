'use strict';
/*
 * https://www.npmjs.org/package/serialport
 */

// Raspberry Pi serial port "/dev/ttyACM0"

// Private variables
var serialPort = require("serialport");
var winston = require('./winston');


var list = serialPort.list(function (err, ports) {
  return ports;
});
module.exports = list;
