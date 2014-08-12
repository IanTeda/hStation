'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SettingsSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Settings', SettingsSchema);