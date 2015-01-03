'use strict';

var mongoose = require('mongoose'),
    winston = require('./../../config/winston'),
    Schema = mongoose.Schema;

var WeatherSchema = new Schema({
  timestamp: {
    type: Date,
    default: 0
  },
  carbonMonoxide: {
    type: Number,
    default: -2
  },
  dewPoint: {
    type: Number,
    default: -2
  },
  dust: {
    type: Number,
    default: -2
  },
  humidity: {
    type: Number,
    default: -2
  },
  infraRed: {
    type: Number,
    default: -2
  },
  lux: {
    type: Number,
    default: -2
  },
  methane: {
    type: Number,
    default: -2
  },
  pressure: {
    type: Number,
    default: -2
  },
  temperature: {
    type: Number,
    default: -201
  },
  ultraViolet: {
    type: Number,
    default: -2
  },
});

WeatherSchema.statics = {

  /**
   * Create a reading in the database
   * @param weather
   * @param callback
   */
  create: function (weather, callback) {

    // Round out timestamp to nearest minute
    var coeff = 1000 * 60 // 1 Minute
    var timestamp = Date.now();
    timestamp = Math.round(timestamp / coeff) * coeff;

    // New instance to be saved
    var data = new this();

    data.timestamp = timestamp;
    data.weather = weather;
    data.save(function (error) {
      if (error) {
        winston.error('Error adding weather station reading: ' + error);
        error = callback;
      }
    });
  },

  /**
   * Get the last reading from the database
   * @param callback
   */
  latest: function (callback) {
    this.findOne({}, {}, { sort: { 'timestamp': -1 } })
      .exec(callback);
  },

  /**
   * Check if weather collection is empty, if so add default settings
   */
  seedIfEmpty: function (callback) {
    // Check if User collection is empty
    this.find(function (err, weather) {
      // Else check if settings is empty and then load default settings
      if (weather.length === 0) {
        console.log('Weather sead if empty');

      } else {
        winston.error('Could not find weather schema');
      }

    });
  }

}

module.exports = mongoose.model('Weather', WeatherSchema);