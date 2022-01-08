const express = require('express');
const router = express.Router();

const cartController = require('./cartController');

// GET Methods //
router.get('/', cartController.getCart);

module.exports = router;