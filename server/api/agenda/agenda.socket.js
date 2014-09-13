/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Agenda = require('./agenda.model');

exports.register = function(socket) {
  Agenda.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Agenda.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('agenda:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('agenda:remove', doc);
}