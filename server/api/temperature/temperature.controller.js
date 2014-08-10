'use strict';

var _ = require('lodash');
var Temperature = require('./temperature.model');

// Get list of temperatures
exports.index = function(req, res) {
  Temperature.find(function (err, temperatures) {
    if(err) { return handleError(res, err); }
    return res.json(200, temperatures);
  });
};

// Get a single temperature
exports.show = function(req, res) {
  Temperature.findById(req.params.id, function (err, temperature) {
    if(err) { return handleError(res, err); }
    if(!temperature) { return res.send(404); }
    return res.json(temperature);
  });
};

// Creates a new temperature in the DB.
exports.create = function(req, res) {
  Temperature.create(req.body, function(err, temperature) {
    if(err) { return handleError(res, err); }
    return res.json(201, temperature);
  });
};

// Updates an existing temperature in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Temperature.findById(req.params.id, function (err, temperature) {
    if (err) { return handleError(res, err); }
    if(!temperature) { return res.send(404); }
    var updated = _.merge(temperature, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, temperature);
    });
  });
};

// Deletes a temperature from the DB.
exports.destroy = function(req, res) {
  Temperature.findById(req.params.id, function (err, temperature) {
    if(err) { return handleError(res, err); }
    if(!temperature) { return res.send(404); }
    temperature.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}