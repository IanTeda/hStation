/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Temperature = require('./temperature.model');

exports.register = function(socket) {
  Temperature.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Temperature.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('temperature:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('temperature:remove', doc);
}