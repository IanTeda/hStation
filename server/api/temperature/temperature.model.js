'use strict';

var mongoose = require('mongoose'),
  winston = require('./../../config/winston'),
  Schema = mongoose.Schema;

var TemperatureSchema = new Schema({
  timestamp: {
    type: Date,
    default: 0
  },
  reading: {
    type: Number,
    default: -101
  }
});

TemperatureSchema.statics = {

  /**
   * Create a reading in the database
   * @param reading
   * @param callback
   */
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
        winston.error('Error adding temperature reading: ' + error);
        error = callback;
      }
    });
  },

  /**
   * Get the latest reading from the database
   * @param callback
   */
  latest: function (callback) {
    this.findOne({}, {}, { sort: { 'timestamp': -1 } })
      .exec(callback);
  },

  /**
   * Calculate if readings are trendig down, flat or up
   * @param callback
   */
  trending: function (callback) {
    // Get the latest 5 readings to calculate trend
    this.find({}, {}, { sort: { 'timestamp': -1 } })
      .limit(5)
      .exec(function (err, readings){

        // Check if MongooseJS returns an error
        if (err) {
          return err

          // Else we must be good
        } else {

          // Initialise variables to 0 for calculation
          var count = 0;
          var difference = 0;

          // Interate over returned array to calculate movement
          for (var key in readings) {
            if (readings.hasOwnProperty(key)) {
              // Increase count by 1
              count++

              // We can only calculate difference after we have done two passess
              if(count > 1){

                // Calculate the difference and add to the last calculation so we can average them out
                difference = difference + (readings[key - 1].reading - readings[key].reading);
              }
            }
          };

          // Average out the movement between readings
          var movement = difference / count;

          // Intialise callback object so it is empty;
          var trend = [];

          // Set callback object depending on trend
          if (movement < 0){
            trend.push({
              movement: movement,
              trend: -1
            });
          } else if (movement > 0){
            trend.push({
              movement: movement,
              trend: 1
            });
          } else {
            trend.push({
              movement: movement,
              trend: 0
            });
          }

          // Callback the trend
          callback(trend);
        }
      });
  }
};

module.exports = mongoose.model('Temperature', TemperatureSchema);