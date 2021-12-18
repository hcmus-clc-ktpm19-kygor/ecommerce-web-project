const express = require('express');
const router = express.Router();

const cartController = require('./cartApiController');

// GET Methods //
router.get('/', cartController.getCart);

// POST Methods //
router.post('/', cartController.insertCart);


module.exports = router;