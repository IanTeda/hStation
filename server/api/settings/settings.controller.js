'use strict';

var _ = require('lodash');
var Settings = require('./settings.model');
var winston = require('./../../config/winston');

/**
 * Get list of all settings, which is 1
 * @param req
 * @param res
 */
exports.index = function(req, res) {
  Settings.find(function (err, settings) {
    if(err) { return handleError(res, err); }
    return res.json(200, settings);
  });
};

/**
 * Update our single setting document
 * @param req
 * @param res
 */
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Settings.findById(req.params.id, function (err, settings) {
    if (err) { return handleError(res, err); }
    if(!settings) { return res.send(404); }
    var updated = _.merge(settings, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      winston.info('hStation settings updated');
      return res.json(200, settings);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}