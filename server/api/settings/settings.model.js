'use strict';

var mongoose = require('mongoose');
var winston = require('./../../config/winston');
var config = require('./../../config/environment')
var Schema = mongoose.Schema;

var SettingsSchema = new Schema({
  serialport          : String,
  sensor_cron         : String,
  sensor_cron_running : Boolean
});

SettingsSchema.statics = {

  /**
   * Check if settings collection is empty, if so add default settings
   */
  seedIfEmpty: function () {
    this.find(function (err, settings) {

      // If find returns an error log it to winston
      if (err) {
        winston.error('Could not find settings schema ' + err);
      }
      // Else check if settings is empty and then load default settings
      else if (settings.length === 0) {

        var Settings = mongoose.model('Settings');

        // Set default user info
        var defaultSetting = new Settings({
          serialport : config.model_defaults.settings.serialport,
          sensor_cron : config.model_defaults.settings.sensor_cron,
          sensor_cron_running : config.model_defaults.settings.sensor_cron_running,
        });

        // Save default user to database
        defaultSetting.save(function (err) {
          if (err) {
            wintson.error('Error saving default settings: ' + err);
          } else {
            winston.info('Settings collection empty so added default values');
          }
        });

        winston.info('Set default values for setting');
      }
    });
  },

  getSettings: function (callback) {
    this.findOne({}, {}, { sort: { 'timestamp': 1 } })
      .exec(callback);
    //console.log('getSettings: ' + callback);
  }

};

module.exports = mongoose.model('Settings', SettingsSchema);