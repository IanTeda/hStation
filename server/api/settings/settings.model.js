'use strict';

var mongoose = require('mongoose'),
    winston = require ('./../../config/winston'),
    Schema = mongoose.Schema;

var SettingsSchema = new Schema({
  serialport : {
    type: String,
    default: "Default serial port"
  }
});

SettingsSchema.statics = {

  /**
   * Check if settings collection is empty, if so add default settings
   */
  seedIfEmpty: function () {
    this.find(function (err, settings) {

      // If find returns an error log it to winston
      if (err) {
        winston.error(err);
      }
      // Else check if settings is empty and then load default settings
      else if (settings.length === 0) {
        var settings = mongoose.model('Settings');
        settings.setDefaultValues();
        winston.info('Settings schema empty so set default values');
      }
    });
  },

  /**
   * Set default values for settings Schema.
   * Separate static method so one can reset from outside seedIfEmpty
   */
  setDefaultValues: function () {
    // Set default values for settings
    var settings = mongoose.model('Settings');
    settings.setSerialPort('No serial port set');
  },

  /**
   * Set serial port to be used with the Arduino
   * @param serialPort
   */
  setSerialPort: function(serialPort) {
    console.log('setSerialPort: ' + serialPort);
  },

  /**
   * Get all settings for app
   * @param callback
   */
  getAllSettings: function(err, callback){
    this.findOne({}, {}, { sort: { 'timestamp': -1 } })
      .exec(callback);
  }

};

module.exports = mongoose.model('Settings', SettingsSchema);