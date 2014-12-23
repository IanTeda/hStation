'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SensorSchema = new Schema({
  timestamp: {
    type: Date,
    default: 0,
    required: true
  },
  dewpoint: {
    type: Number,
    default: -101
  },
  humidity: {
    type: Number,
    default: -101
  },
  pressure: {
    type: Number,
    default: -101
  },
  temperature: {
    type: Number,
    default: -101
  }
});

SensorSchema.statics = {

  /**
   * Create a reading in the database
   * @param reading
   * @param callback
   */
  create: function (dewpoint, humidity, pressure, temperature, callback) {

    // Round out timestamp to nearest minute
    var coeff = 1000 * 60 // 1 Minute
    var timestamp = Date.now();
    timestamp = Math.round(timestamp / coeff) * coeff;

    this.findOne({timestamp : timestamp}, function(err, reading){
      console.log('into mongoose findone');
    });

  }
}

module.exports = mongoose.model('Sensor', SensorSchema);