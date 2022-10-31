const express = require('express');
const router = express.Router();
const productService = require('../components/product/productService');

/* GET home page. */
router.get('/',  async function(req, res, next) {
  const products = await productService.getAllProduct();
  res.render('index', {products});
});

module.exports = router;
