'use strict';

var _ = require('lodash');
var Humidity = require('./humidity.model');

// Get list of humiditys
exports.index = function (req, res) {
  Humidity.find(function (err, humiditys) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(200, humiditys);
  });
};

// Get a single humidity
exports.show = function (req, res) {
  // If we have a 0 param id then we want the lastest reading
  if (req.params.id == 0) {
    Humidity.latest(function (err, humidity) {
      if (err) {
        return handleError(res, err);
      }
      // If the return is null send a 404
      if (!humidity) {
        return res.send(404);
      }
      // Return latest reading
      return res.json(humidity);
    });

    // Check if requesting current trend
  } else if (req.params.id == 'trend') {
    Humidity.trending(function (err, trend) {

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
    Humidity.findById(req.params.id, function (err, humidity) {
      if (err) {
        return handleError(res, err);
      }
      if (!humidity) {
        return res.send(404);
      }
      return res.json(humidity);
    });
  }
};

// Get a single humidity
exports.latest = function (req, res) {
  Humidity.latest(function (err, humidity) {
    if (err) {
      return handleError(res, err);
    }
    if (!humidity) {
      return res.send(404);
    }
    return res.json(humidity);
  });
};

// Creates a new humidity in the DB.
exports.create = function (req, res) {
  Humidity.create(req.body, function (err, humidity) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(201, humidity);
  });
};

// Updates an existing humidity in the DB.
exports.update = function (req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Humidity.findById(req.params.id, function (err, humidity) {
    if (err) {
      return handleError(res, err);
    }
    if (!humidity) {
      return res.send(404);
    }
    var updated = _.merge(humidity, req.body);
    updated.save(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, humidity);
    });
  });
};

// Deletes a humidity from the DB.
exports.destroy = function (req, res) {
  Humidity.findById(req.params.id, function (err, humidity) {
    if (err) {
      return handleError(res, err);
    }
    if (!humidity) {
      return res.send(404);
    }
    humidity.remove(function (err) {
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