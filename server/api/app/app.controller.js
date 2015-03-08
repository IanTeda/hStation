'use strict';

var pjson = require('./../../../package.json');
var serialPort = require('serialport');

// Return info from Node package.json
exports.info = function(req, res) {

  var returnJson = {};
  returnJson['name'] = pjson.name;
  returnJson['description'] = pjson.description;
  returnJson['version'] = pjson.version;
  returnJson['author'] = pjson.author;

  return res.json(200, returnJson);
};

function handleError(res, err) {
  return res.send(500, err);
};
