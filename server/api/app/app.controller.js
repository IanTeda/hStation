'use strict';

var pjson = require('./../../../package.json');
var serialPort = require("serialport");

// Return info from Node package.json
exports.info = function(req, res){

  var returnJson = {};
  returnJson['name'] = pjson.name;
  returnJson['description'] = pjson.description;
  returnJson['version'] = pjson.version;
  returnJson['author'] = pjson.author;

  return res.json(200, returnJson);
};

// Return list of serial ports
exports.ports = function(req, res) {
  console.log('serialport.index');
  serialPort.list(function (err, ports) {
    if(err) { return handleError(res, err); }
    return res.json(200, ports);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}