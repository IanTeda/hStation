'use strict';
/*
 * https://www.npmjs.org/package/serialport
 */

// Raspberry Pi serial port "/dev/ttyACM0"

// Private variables
var SerialPort = require("serialport");
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

var com = new SerialPort(port, settings, function (err)
{
  // If serial port for the Arduino is not available catch the error
  if (err) {
    winston.error("Unable to connect to serial port! " + err);
  }
});
port.open();
port.on('data', function(data){
  write_next_message(data);
})

function write_next_message(data){
  var message = message_queue.pop();
  port.write(message + '\r', function(err, results){
    //I'm actually doing something in here with err/results
  });
}

// Listen to serial port
function listener(debug)
{

};