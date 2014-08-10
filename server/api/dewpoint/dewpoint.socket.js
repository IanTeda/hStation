/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Dewpoint = require('./dewpoint.model');

exports.register = function(socket) {
  Dewpoint.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Dewpoint.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('dewpoint:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('dewpoint:remove', doc);
}