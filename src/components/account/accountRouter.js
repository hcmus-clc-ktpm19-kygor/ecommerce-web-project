const express = require('express');
const router = express.Router();
const controller = require('./accountController');
const upload = require('../../config/multer.config');

// GET Method
router.get('/:id', controller.get);

// POST Method
router.post('/', controller.insert);

// PUT Method
router.put('/:id', upload.single('avatar'), controller.update);

module.exports = router;