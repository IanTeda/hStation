/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

// Add default user if DB empty
var User = require('../api/user/user.model');
User.seedIfEmpty();