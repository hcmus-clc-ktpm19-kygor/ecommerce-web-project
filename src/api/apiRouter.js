const express = require('express');
const router = express.Router();
const commentApiRouter = require('./comment/commentApiRouter');
const cartApiRouter = require('./shopping/cart/cartApiRouter');

router.use('/products', commentApiRouter);
router.use('/cart', cartApiRouter);

module.exports = router;