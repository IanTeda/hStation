'use strict';

var _ = require('lodash');
var serialPort = require("serialport");

// Return list of serial ports available
exports.index = function(req, res) {
  serialPort.list(function (err, ports) {
    if(err) { return handleError(res, err); }
    return res.json(200, ports);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}