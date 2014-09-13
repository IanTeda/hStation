'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var winston = require('./../../config/winston');
var config = require('./../../config/environment');

var AgendaSchema = new Schema({
  sensor: String,
  interval: String,
  command: String,
  active: Boolean
});

AgendaSchema.statics = {

  /**
   * Check if user collection is empty, if so add default admin user
   */
  seedIfEmpty: function () {
    // Check if User collection is empty
    this.find(function (err, agendas) {

      if (err) {
        winston.error('agenda.model.js error: ' + err);
      }
      else if (agendas.length === 0) {

        // Add default user to database
        var Agenda = mongoose.model('Agenda');

        addAgenda(Agenda, 'Humidity', config.agenda.default.interval, 'HUMIDITY');
        addAgenda(Agenda, 'Pressure', config.agenda.default.interval, 'PRESSURE');
        addAgenda(Agenda, 'Temperature', config.agenda.default.interval, 'TEMPERATURE');
        addAgenda(Agenda, 'Dew Point', config.agenda.default.interval, 'DEWPOINT');
      }
    });
  }
};

function addAgenda(Agenda, sensor, interval, command) {
  var agenda = new Agenda({
    sensor: sensor,
    interval: interval,
    command: command,
    active: true
  });

  agenda.save(function (err) {
    if (err) {
      wintson.error('agenda.model.js error: ' + err);
    }
    else {
      winston.info('Agenda collection empty so added default document for ' + sensor);
    }
  });
}

module.exports = mongoose.model('Agenda', AgendaSchema);