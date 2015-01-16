'use strict';

var express = require('express');
var controller = require('./wikipedia.controller');

var router = express.Router();

router.get('/categories/', controller.categories);
router.get('/page/:page', controller.page);
router.get('/revisions/:rev', controller.revisions);

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;