/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

// Add default user if DB schema is empty
var User = require('../api/user/user.model');
User.seedIfEmpty();

// Add default settings if DB schema is empty
var Settings = require('../api/settings/settings.model');
Settings.seedIfEmpty();