'use strict';

/**
 JOB DEFINITIONS
 Definitions for sensor jobs to be run by agenda
 https://github.com/rschmukler/agenda
 **/

var winston = require('./../winston');
var config = require('./../environment');
var Serialport = require("serialport").SerialPort;
var Settings = require('./../../api/settings/settings.model');

// Static variables from environmental config. Makes things more readable
var JOB = config.sensors.weather.agenda_job_name;

var COMMAND = config.sensors.weather.command;

module.exports = function(agenda) {

  agenda.define(JOB, function(job, done) {

    // Request reading from Arduino
    requestReading(COMMAND);

    // Done with Agenda Job
    done();
  });

};

function requestReading(command) {

  // Intialise recievedDataBuffer to empty;
  var recievedDataBuffer = '';
  var resetByte = '!';
  var stopByte = '#';

  // Get the settings so we know what port to use
  Settings.getSettings(function (err, settings) {

    // Get serialport from settings
    var port = settings.serialport;

    // Set options for new serialport from environment config file
    var options = config.serialport.options;

    // Open the port found above
    var serialport = new Serialport(port, options, function (err) {

      // If serial port for the Arduino is not available catch the error
      if (err) {
        winston.error("sensor.js error! " + err);
      }

    });

    // Catch open serial port event
    serialport.on("open", function (err) {

      // Check to see if open event returns an error
      if (err) {

        // Log error to winston
        winston.error('sensor.js: ' + err);

        // All good so write command to port
      } else {

        // Catch on error serial port event
        serialport.on('error', function (err) {
          winston.error("Error seraialport.js:" + err);
        });

        // Catch data event from serial port and parse message
        serialport.on('data', function (data) {

          // Keep adding bytes to buffer
          recievedDataBuffer += data.toString();

          // If we have a stop byte and reset byte we have a message
          if (recievedDataBuffer.indexOf(stopByte) >= 0 && recievedDataBuffer.indexOf(resetByte) >= 0) {

            // Get the message between reset and stop bytes
            var message = recievedDataBuffer.substring(recievedDataBuffer.indexOf(resetByte) + 1, recievedDataBuffer.indexOf(stopByte));

            // Now we have the message reset buffer
            recievedDataBuffer = "";

            //console.log("The Arduino said: " + message);

            // Add received reading to database
            addToDatabase(message);

            // Now we have processed the message rest the message
            message = "";
          }
        });

        // Add reset and stop bytes to command
        command = resetByte + command + stopByte;

        // Write to serial port
        serialport.write(command, function (err) {

          // Catch any errors trying to write to serial port
          if (err) {
            // Log error to winston
            winston.error('sensor.js: ' + err);
          };
        });
      };
    });
  });
};

function addToDatabase(message) {

  var Weather = require('./../../api/weather/weahter.model');

  // Strip out white spaces from buffer
  message = message.replace(/ /g, '');

  // Match string by colon and assign
  var sensor = message.match(/[^:]+/g)[0];
  var reading = message.match(/[^:]+/g)[1];

  // Add reading to relevant model
  if (sensor == COMMAND){
    Weather.createReading(reading);
  }

};