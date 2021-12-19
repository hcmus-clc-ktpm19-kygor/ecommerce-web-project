const express = require('express');
const router = express.Router();

const productController = require('./productController');

// GET Method
// Paging
router.get('/', productController.paging);
// Get 1 product
router.get('/:id', productController.get);

module.exports = router;