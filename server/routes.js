/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/sensors', require('./api/sensor'));
  app.use('/api/settingss', require('./api/settings'));
  app.use('/api/logs', require('./api/log'));
  app.use('/api/settings', require('./api/settings'));
  app.use('/api/serialport', require('./api/serialport'));
  app.use('/api/pressures', require('./api/pressure'));
  app.use('/api/humiditys', require('./api/humidity'));
  app.use('/api/dewpoints', require('./api/dewpoint'));
  app.use('/api/temperatures', require('./api/temperature'));
  app.use('/api/app', require('./api/app'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
