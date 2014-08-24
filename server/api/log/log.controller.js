'use strict';

var _ = require('lodash');
var winston = require('./../../config/winston')

// Get list of logs
exports.index = function(req, res) {

  // Return logs from last 24hrs
  //TODO: Parametise api
  var options = {
    until:  new Date,
    from:   new Date - 24 * 60 * 60 * 1000,
    start:  0,
    limit:  24 * 60 * 60 * 1000,
    order:  'desc',
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