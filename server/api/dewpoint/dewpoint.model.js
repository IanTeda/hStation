'use strict';

var mongoose = require('mongoose'),
  winston = require('./../../config/winston'),
  Schema = mongoose.Schema;

var DewPointSchema = new Schema({
  timestamp: {
    type: Date,
    default: 0
  },
  reading: {
    type: Number,
    default: -101
  }
});

DewPointSchema.statics = {
  createReading: function (reading, callback) {

    // Round timestamp to nearest 10 minutes
    var coeff = 1000 * 60 * 10; //10 minutes
    var timestamp = new Date(Math.round(date.getTime() / coeff) * coeff);

    // New instance to be saved
    var data = new this();

    data.timestamp = timestamp;
    data.reading = reading;
    data.save(function (error) {
      if (error) {
        winston.error('Error adding dew point reading: ' + error);
        error = callback;
      } else {
        winston.info('Added new dew point reading of ' + reading + ' @ ' + timestamp.toString());
      }
    });
  },
  getLatest: function (callback) {
    this.findOne({}, {}, { sort: { 'timestamp': -1 } })
      .exec(callback);
  }
};

module.exports = mongoose.model('DewPoint', DewPointSchema);