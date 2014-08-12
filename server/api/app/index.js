'use strict';

var express = require('express');
var controller = require('./app.controller');
var router = express.Router();

router.get('/', controller.info);
router.get('/ports', controller.ports);

module.exports = router;