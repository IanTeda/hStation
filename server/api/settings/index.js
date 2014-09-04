'use strict';

/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

var express = require('express');
var controller = require('./settings.controller');

var router = express.Router();

// We only want to get and update the single setting document
router.get('/', controller.index);
router.put('/:id', controller.update);

module.exports = router;