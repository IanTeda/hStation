'use strict';

var _ = require('lodash');
var SerialPort = require('serialport');

// Return list of serial ports available
exports.index = function(req, res) {
  SerialPort.list(function (err, ports) {
    if(err) { return handleError(res, err); }
    return res.json(200, ports);
  });
};

exports.testAndConnect = function(req, res) {
  //SerialPort.testAndConnect();
  return res.json(200, 'ToDo');
};

function handleError(res, err) {
  return res.send(500, err);
}