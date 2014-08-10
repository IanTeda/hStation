/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Humidity = require('./humidity.model');

exports.register = function(socket) {
  Humidity.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Humidity.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('humidity:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('humidity:remove', doc);
}