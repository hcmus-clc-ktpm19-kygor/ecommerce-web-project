const express = require('express');
const router = express.Router();
const commentApiRouter = require('./comment/commentApiRouter');

router.use('/products', commentApiRouter);

module.exports = router;