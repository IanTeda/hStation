'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var winston = require('./../../config/winston');

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

        addAgenda(Agenda, 'humidity', 'every 10 minutes', 'HUMIDITY');
        addAgenda(Agenda, 'pressure', 'every 10 minutes', 'PRESSURE');
        addAgenda(Agenda, 'temperature', 'every 10 minutes', 'TEMPERATURE');
        addAgenda(Agenda, 'dewpoint', 'every 10 minutes', 'DEWPOINT');
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