'use strict';

var express = require('express');
var controller = require('./settings.controller');

var router = express.Router();

router.get('/', controller.index);
//router.get('/:id', controller.show);
//router.post('/serialport', controller.create);
router.put('/:setting', controller.updateSetting);
//router.patch('/:id', controller.update);
//router.delete('/:id', controller.destroy);

module.exports = router;