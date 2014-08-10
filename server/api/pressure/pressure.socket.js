/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Pressure = require('./pressure.model');

exports.register = function(socket) {
  Pressure.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Pressure.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('pressure:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('pressure:remove', doc);
}