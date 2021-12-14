const express = require('express');
const router = express.Router();

const productController = require('./productController');

// GET Method
// Paging
router.get('/', productController.paging);
// Get 1 product
router.get('/:id', productController.get);

// POST Method
router.post('/', productController.insert);

// PUT Method
router.put('/:id', productController.update);

// DELETE Method
router.delete('/:id', productController.delete);

module.exports = router;