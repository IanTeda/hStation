'use strict';

var _ = require('lodash');
var Settings = require('./settings.model');

// Get list of settings
exports.index = function(req, res) {
  Settings.getAllSettings(function (err, settings) {
    if (settings) {
      res.jsonp(settings);
    } else {
      res.send(404, 'Empty settings');
    }
  });
};

// Get a single settings
exports.show = function(req, res) {
  Settings.findById(req.params.id, function (err, settings) {
    if(err) { return handleError(res, err); }
    if(!settings) { return res.send(404); }
    return res.json(settings);
  });
};

// Creates a new settings in the DB.
exports.create = function(req, res) {
  Settings.create(req.body, function(err, settings) {
    if(err) { return handleError(res, err); }
    return res.json(201, settings);
  });
};

// Updates an existing settings in the DB.
exports.updateSetting = function(req, res) {
  console.log('updateSetting ' + req.params.setting + ":" + req.body.comName);
};

// Updates an existing settings in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Settings.findById(req.params.id, function (err, settings) {
    if (err) { return handleError(res, err); }
    if(!settings) { return res.send(404); }
    var updated = _.merge(settings, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, settings);
    });
  });
};

// Deletes a settings from the DB.
exports.destroy = function(req, res) {
  Settings.findById(req.params.id, function (err, settings) {
    if(err) { return handleError(res, err); }
    if(!settings) { return res.send(404); }
    settings.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}