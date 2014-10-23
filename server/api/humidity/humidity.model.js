'use strict';

var mongoose = require('mongoose'),
  winston = require('./../../config/winston'),
  Schema = mongoose.Schema;

var HumiditySchema = new Schema({
  timestamp: {
    type: Date,
    default: 0
  },
  reading: {
    type: Number,
    default: -101
  }
});

HumiditySchema.statics = {
  createReading: function (reading, callback) {

    // Round out timestamp to nearest minute
    var coeff = 1000 * 60 // 1 Minute
    var timestamp = Date.now();
    timestamp = Math.round(timestamp / coeff) * coeff;

    // New instance to be saved
    var data = new this();

    data.timestamp = timestamp;
    data.reading = reading;
    data.save(function (error) {
      if (error) {
        winston.error('Error adding humidity reading: ' + error);
        error = callback;
      }
    });
  },
  getLatest: function (callback) {
    this.findOne({}, {}, { sort: { 'timestamp': -1 } })
      .exec(callback);
  }
};

module.exports = mongoose.model('Humidity', HumiditySchema);