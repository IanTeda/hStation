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
var HUMIDITY_JOB = config.sensors.humidity.agenda_job_name;
var PRESSURE_JOB = config.sensors.pressure.agenda_job_name;
var TEMPERATURE_JOB = config.sensors.temperature.agenda_job_name;
var DEWPOINT_JOB = config.sensors.dewpoint.agenda_job_name;

var HUMIDITY_COMMAND = config.sensors.humidity.command;
var PRESSURE_COMMAND = config.sensors.pressure.command;
var TEMPERATURE_COMMAND = config.sensors.temperature.command;
var DEWPOINT_COMMAND = config.sensors.dewpoint.command;


module.exports = function(agenda) {

  agenda.define(HUMIDITY_JOB, function(job, done) {

    // Request reading from Arduino
    requestReading(HUMIDITY_COMMAND);

    // Done with Agenda Job
    done();
  });

  agenda.define(PRESSURE_JOB, function(job, done) {

    // Request reading from Arduino
    requestReading(PRESSURE_COMMAND);

    // Done with Agenda Job
    done();
  });

  agenda.define(TEMPERATURE_JOB, function(job, done) {

    // Request reading from Arduino
    requestReading(TEMPERATURE_COMMAND);

    // Done with Agenda Job
    done();
  });

  agenda.define(DEWPOINT_JOB, function(job, done) {

    // Request reading from Arduino
    requestReading(DEWPOINT_COMMAND);

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

  // Database models to add readings to
  var Humidity = require('./../../api/humidity/humidity.model');
  var Pressure = require('./../../api/pressure/pressure.model');
  var Temperature = require('./../../api/temperature/temperature.model');
  var DewPoint = require('./../../api/dewpoint/dewpoint.model');

  // Strip out white spaces from buffer
  message = message.replace(/ /g, '');

  // Match string by colon and assign
  var sensor = message.match(/[^:]+/g)[0];
  var reading = message.match(/[^:]+/g)[1];

  // Add reading to relevant model
  if (sensor == HUMIDITY_COMMAND){
    Humidity.createReading(reading);

  } else if (sensor == PRESSURE_COMMAND){
    Pressure.createReading(reading);

  } else if (sensor == TEMPERATURE_COMMAND){
    Temperature.createReading(reading);

  } else if (sensor == DEWPOINT_COMMAND){
    DewPoint.createReading(reading);
  }

};