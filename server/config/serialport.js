'use strict';
/*
 * https://www.npmjs.org/package/serialport
 */

// Raspberry Pi serial port "/dev/ttyACM0"

// Private variables
var SerialPort = require("serialport").SerialPort;
var winston = require('./winston');
var config = require('./environment');
var port = config.serialport;
var settings =
{
  baudrate: 9600,
  dataBits: 8,
  parity: 'none',
  stopBits: 1,
  flowControl: false
};
var  message_queue = []; //long list of messages

// Load new instance of serial port
var serialPort = new SerialPort(port, settings, function (err)
{
  // If serial port for the Arduino is not available catch the error
  if (err) {
    winston.error("seraialport.js error! " + err);
  }
});

/**
 * Open serial connection to Arduino and listen for events
 */
serialPort.on("open", function (error) {

  if (error) {
    winston.error('Error opening connection to Arduino ' + error);
  } else {
    winston.info('Communicating with the arduino on port ' + port);
  }

  serialPort.on('close', function (error) {
    if (error) {
      winston.error("Error closing serial connection " + error);
    } else {
      winston.info("Serial port " + arduinoPort + " closed ");
    }
  });

  serialPort.on('error', function (error) {
    winston.error(error + " while communicating on port " + arduinoPort);
  });

  serialPort.on('data', function (data) {

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

// Listen to serial port
function listener(debug)
{

};