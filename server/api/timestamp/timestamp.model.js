'use strict';

var mongoose = require('mongoose'),
  winston = require('./../../config/winston'),
  Schema = mongoose.Schema;

var TimeStampSchema = new Schema({
  timestamp: {
    type: Date,
    default: 0
  }
});

module.exports = mongoose.model('TimeStamp', TimeStampSchema);