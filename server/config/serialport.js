'use strict';
/*
 * https://www.npmjs.org/package/serialport
 */

// Raspberry Pi serial port "/dev/ttyACM0"

// Private variables
var serialport = require("serialport");
var SerialPort = serialport.SerialPort;
var com;
var winston = require('./winston');
var config = require('./environment');
var settings =
{
  baudrate: 9600,
  dataBits: 8,
  parity: 'none',
  stopBits: 1,
  flowControl: false
};

serialport.list(function (err, ports) {

  // Lets find which com port the Arduino is on
  winston.info('Looking for Arduino port');

  // Set the serial port to null before we start looking
  var port = null;

  // Interate through ports looking for the Arduino
  ports.forEach(function (p) {

    // This should work on windows and maybe osx
    if (p.manufacturer.indexOf('Arduino') !== -1) {
      port = p.comName;
      winston.info('Found Arduino on port ' + port);

      // This will work on raspberry pi / linux
    } else if (p.hasOwnProperty('pnpId')) {
      // FTDI captures the duemilanove //
      // Arduino captures the leonardo //
      if (p.pnpId.search('FTDI') != -1 || p.pnpId.search('Arduino') != -1) {
        port = p.comName;
        winston.info('Found Arduino on port ' + port);
      }
    }
  });

  // Open the port found above
  com = new SerialPort(port, settings, function (err) {
    // If serial port for the Arduino is not available catch the error
    if (err) {
      winston.error("seraialport.js error! " + err);
    }
  });

  // hook up open event
  com.on("open", function (err) {

    if (err) {
      winston.error('seraialport.js: ' + err);
    } else {
      winston.info('Communicating with the Arduino on port ' + port);
    }

    com.on('error', function (err) {
      winston.error("Error seraialport.js:" + err);
    });

    com.on('data', function (data) {

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


    com.write('!TEMPERATURE#', function(err, results) {
      console.log('err ' + err);
      console.log('results ' + results);
    });
  });
});