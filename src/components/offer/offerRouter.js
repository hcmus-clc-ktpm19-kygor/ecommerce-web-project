const express = require('express');
const router = express.Router();
const controller = require('./offerController');

// GET Method
router.get('/:id', controller.get);
router.get('/', controller.getAll);

// POST Method
router.post('/', controller.insert);
module.exports = router;