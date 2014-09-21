'use strict';

var express = require('express');
var controller = require('./serialport.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/search', controller.search);

module.exports = router;