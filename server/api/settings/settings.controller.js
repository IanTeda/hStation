'use strict';

var _ = require('lodash');
var Settings = require('./settings.model');
var winston = require('./../../config/winston');
var agenda = require('./../../config/agenda');
var config = require('./../../config/environment');

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

exports.restart_sensor_cron = function(req, res){

  // Get the settings document and then scedule sensor readings
  Settings.findOne({}, {}, { sort: { 'timestamp': 1 } }, function(err, settings){

    // Only start jobs if settings exist
    if (settings){

      // Schedule sensor readings
      agenda.every(settings.sensor_cron, [
        config.sensors.humidity.agenda_job_name,
        config.sensors.temperature.agenda_job_name,
        config.sensors.pressure.agenda_job_name,
        config.sensors.dewpoint.agenda_job_name
      ]);

      return res.send(201, 'Restarted sensor cron to ' + settings.sensor_cron);

    // Else there must be an error so return 500
    } else {
      return res.send(500);
    }
  });
}

function handleError(res, err) {
  return res.send(500, err);
}