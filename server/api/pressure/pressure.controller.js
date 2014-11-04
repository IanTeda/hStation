'use strict';

var _ = require('lodash');
var Pressure = require('./pressure.model');

// Get list of pressures
exports.index = function (req, res) {
  Pressure.find(function (err, pressures) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(200, pressures);
  });
};

// Get a single pressure
exports.show = function (req, res) {
  // If we have a 0 param id then we want the lastest reading
  if (req.params.id == 0) {
    Pressure.latest(function (err, pressure) {
      if (err) {
        return handleError(res, err);
      }
      // If the return is null send a 404
      if (!pressure) {
        return res.send(404);
      }
      // Return latest reading
      return res.json(pressure);
    });

    // Check if requesting current trend
  } else if (req.params.id == 'trend') {
    Pressure.trending(function (err, trend) {

      if (err) {
        return handleError(res, err);

        // If the return is null send a 404
      } else if (!dewpoint) {
        return res.send(404);
      }
      // Return latest reading
      console.log('controller trend ' + trend);
      return res.json(trend);
    });

    // Else return the requested ID
  } else {
    Pressure.findById(req.params.id, function (err, pressure) {
      if (err) {
        return handleError(res, err);
      }
      if (!pressure) {
        return res.send(404);
      }
      return res.json(pressure);
    });
  }
};

// Creates a new pressure in the DB.
exports.create = function (req, res) {
  Pressure.create(req.body, function (err, pressure) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(201, pressure);
  });
};

// Updates an existing pressure in the DB.
exports.update = function (req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Pressure.findById(req.params.id, function (err, pressure) {
    if (err) {
      return handleError(res, err);
    }
    if (!pressure) {
      return res.send(404);
    }
    var updated = _.merge(pressure, req.body);
    updated.save(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, pressure);
    });
  });
};

// Deletes a pressure from the DB.
exports.destroy = function (req, res) {
  Pressure.findById(req.params.id, function (err, pressure) {
    if (err) {
      return handleError(res, err);
    }
    if (!pressure) {
      return res.send(404);
    }
    pressure.remove(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}