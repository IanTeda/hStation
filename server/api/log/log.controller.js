'use strict';

var _ = require('lodash');
var winston = require('./../../config/winston')

// Get list of logs
exports.index = function(req, res) {

  // Return logs
  var options = {
    until:  new Date,
    start:  0,
    order:  'asc',
    fields: ['timestamp', 'level', 'message']
  };

  winston.query(options, function (err, logs) {
    if(err) { return handleError(res, err); }
    return res.json(200, logs);
  });

};

function handleError(res, err) {
  return res.send(500, err);
}