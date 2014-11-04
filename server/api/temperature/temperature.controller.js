'use strict';

var _ = require('lodash');
var Temperature = require('./temperature.model');

// Get list of temperatures
exports.index = function (req, res) {
  Temperature.find(function (err, temperatures) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(200, temperatures);
  });
};

// Get a single temperature
exports.show = function (req, res) {
  // If we have a 0 param id then we want the lastest reading
  if (req.params.id == 0) {
    Temperature.latest(function (err, temperature) {
      if (err) {
        return handleError(res, err);
      }
      // If the return is null send a 404
      if (!temperature) {
        return res.send(404);
      }
      // Return latest reading
      return res.json(temperature);
    });

  // Check if requesting current trend
  } else if (req.params.id == 'trend') {
    Temperature.trending(function (err, trend) {

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
    Temperature.findById(req.params.id, function (err, temperature) {
      if (err) {
        return handleError(res, err);
      }
      if (!temperature) {
        return res.send(404);
      }
      return res.json(temperature);
    });
  }
};

// Creates a new temperature in the DB.
exports.create = function (req, res) {
  Temperature.create(req.body, function (err, temperature) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(201, temperature);
  });
};

// Updates an existing temperature in the DB.
exports.update = function (req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Temperature.findById(req.params.id, function (err, temperature) {
    if (err) {
      return handleError(res, err);
    }
    if (!temperature) {
      return res.send(404);
    }
    var updated = _.merge(temperature, req.body);
    updated.save(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, temperature);
    });
  });
};

// Deletes a temperature from the DB.
exports.destroy = function (req, res) {
  Temperature.findById(req.params.id, function (err, temperature) {
    if (err) {
      return handleError(res, err);
    }
    if (!temperature) {
      return res.send(404);
    }
    temperature.remove(function (err) {
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