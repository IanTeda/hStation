'use strict';

var serialport = require("serialport");
var SerialPort = serialport.SerialPort;
var winston = require('./winston');

function Arduino(){

  // Add object properties like this
  this.name = name;
  this.gender = gender;
}

// Add methods like this.  All Person objects will be able to invoke this
Person.prototype.speak = function(){
  alert("Howdy, my name is" + this.name);
  // Open the port found above
  var serialport = new SerialPort(port, settings, function (err) {
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
      winston.info('Communicating with the Arduino on port ' + port);
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