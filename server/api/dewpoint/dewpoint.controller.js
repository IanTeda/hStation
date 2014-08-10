'use strict';

var _ = require('lodash');
var Dewpoint = require('./dewpoint.model');

// Get list of dewpoints
exports.index = function(req, res) {
  Dewpoint.find(function (err, dewpoints) {
    if(err) { return handleError(res, err); }
    return res.json(200, dewpoints);
  });
};

// Get a single dewpoint
exports.show = function(req, res) {
  Dewpoint.findById(req.params.id, function (err, dewpoint) {
    if(err) { return handleError(res, err); }
    if(!dewpoint) { return res.send(404); }
    return res.json(dewpoint);
  });
};

// Creates a new dewpoint in the DB.
exports.create = function(req, res) {
  Dewpoint.create(req.body, function(err, dewpoint) {
    if(err) { return handleError(res, err); }
    return res.json(201, dewpoint);
  });
};

// Updates an existing dewpoint in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Dewpoint.findById(req.params.id, function (err, dewpoint) {
    if (err) { return handleError(res, err); }
    if(!dewpoint) { return res.send(404); }
    var updated = _.merge(dewpoint, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, dewpoint);
    });
  });
};

// Deletes a dewpoint from the DB.
exports.destroy = function(req, res) {
  Dewpoint.findById(req.params.id, function (err, dewpoint) {
    if(err) { return handleError(res, err); }
    if(!dewpoint) { return res.send(404); }
    dewpoint.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}