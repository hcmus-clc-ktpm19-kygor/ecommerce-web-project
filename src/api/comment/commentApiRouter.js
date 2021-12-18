const express = require('express');
const router = express.Router();
const commentApiController = require("./commentApiController");

// POST Method
router.post('/:id/comments', commentApiController.postComment);

module.exports = router;