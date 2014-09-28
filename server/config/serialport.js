'use strict';
/*
 * https://www.npmjs.org/package/serialport
 */

// Raspberry Pi serial port "/dev/ttyACM0"

// Private variables
var Serialport = require("serialport").SerialPort;
var winston = require('./winston');
var Settings = require('./../api/settings/settings.model');
var config = require('./environment');
var settings =
{
  baudrate: 9600,
  dataBits: 8,
  parity: 'none',
  stopBits: 1,
  flowControl: false
};

Settings.getSettings(function (err, settings) {

  // There are no settings on first run of app so check
  if(settings){
    // Get serialport from settings
    var port = settings.serialport;

    // Open the port found above
    var serialport = new Serialport(port, settings, function (err) {
      // If serial port for the Arduino is not available catch the error
      if (err) {
        winston.error("seraialport.js error! " + err);
      }
    });

    // hook up open event
    serialport.on("open", function (err) {

      if (err) {
        winston.error('seraialport.js: ' + err);
      } else {
        winston.info('Listening for Arduino on port ' + port);
      }

      serialport.on('error', function (err) {
        winston.error("Error seraialport.js:" + err);
      });

      serialport.on('data', function (data) {

        // Keep adding bytes to buffer
        recievedDataBuffer += data.toString();

        // If we have a stop byte and reset byte we have a message
        if (recievedDataBuffer.indexOf(stopByte) >= 0 && recievedDataBuffer.indexOf(resetByte) >= 0) {

          // Save the message between reset and stop bytes
          var message = recievedDataBuffer.substring(recievedDataBuffer.indexOf(resetByte) + 1, recievedDataBuffer.indexOf(stopByte));

          // Reset buffer
          recievedDataBuffer = "";
          readings.logReading(message);
          //console.log("The Arduino said: " + message);
          message = "";
        }
      });
    });
  }
});