const express = require('express');
const router = express.Router();

const cartController = require('./cartApiController');

// GET Methods //
router.post('/:id', cartController.insertProductToCart);

// POST Methods //
router.post('/', cartController.insertCart);


module.exports = router;