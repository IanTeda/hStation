'use strict';

var mongoose = require('mongoose'),
    winston = require('./../../config/winston'),
    Schema = mongoose.Schema;

var WeatherSchema = new Schema({
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
  barometricPressure: {
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
  timestamp: {
    type: Date,
    default: 0
  }
});

WeatherSchema.statics = {

  /**
   * Create a reading in the database
   * @param weather
   * @param callback
   */
  createReading: function (weather, callback) {

    // Reference new document instance to be saved
    var document = new this();

    // Reference new array of sensor readings. Matched between ','
    var sensors = weather.match(/[^,]+/g);

    // Interate over sensor array
    for (var i=0; i < sensors.length; i++) {

      // Determine key and value for each array iteration
      var key = sensors[i].match(/[^:]+/g)[0];
      var value = sensors[i].match(/[^:]+/g)[1];

      //console.log('key: ' + key + " | Value: " + value);

      // Add to new document based on key
      if(key === 'carbonMonoxide'){
        document.carbonMonoxide = value;
      }
      else if(key === 'dewPoint'){
        document.dewPoint = value;
      }
      else if(key === 'dust'){
        document.dust = value;
      }
      else if(key === 'humidity'){
        document.humidity = value;
      }
      else if(key === 'infraRed'){
        document.infraRed = value;
      }
      else if(key === 'lux'){
        document.lux = value;
      }
      else if(key === 'methane'){
        document.methane = value;
      }
      else if(key === 'barometricPressure'){
        document.barometricPressure = value;
      }
      else if(key === 'temperature'){
        document.temperature = value;
      }
      else if(key === 'ultraViolet'){
        document.ultraViolet = value;
      }

    }

    // Round out timestamp to nearest minute
    var coeff = 1000 * 60 // 1 Minute
    var timestamp = Date.now();
    timestamp = Math.round(timestamp / coeff) * coeff;

    // Add timestamp to new document
    document.timestamp = timestamp;

    // Save new doucment
    document.save(function (error) {
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
   * Get all readings from a given day
   * @param date
   * @param callback
   */
  day: function (date, callback) {

    // Number of milliseconds in a day, less one millisecond
    var ONE_DAY = 24*60*60*1000 - 1;

    // Set time for date to midnight (just in case a part way through the day is passed)
    var start = new Date(date).setHours(0,0,0,0);

    // Set finish millisecond as just before midnight (one+day)
    var finish = start + ONE_DAY;

    // Find documents in the given timestamps
    this.find({
      timestamp : {
        $gte: start,
        $lt: finish
      }
    }).exec(callback)
  },

  /**
   * Get all readings from a given day
   * @param date
   * @param callback
   */
  last24hrs: function (callback) {

    // Number of milliseconds in a day
    var TWENTY_FOUR_HRS = 24*60*60*1000;

    // Set finish date/time to now
    var finish = new Date().now;

    // Set start 24 hours of milliseconds less then now
    var start = finish - TWENTY_FOUR_HRS;

    // Find documents between the given time stamps
    this.find({
      timestamp : {
        $gte: start,
        $lt: finish
      }
    }).exec(callback)
  }

}

module.exports = mongoose.model('Weather', WeatherSchema);