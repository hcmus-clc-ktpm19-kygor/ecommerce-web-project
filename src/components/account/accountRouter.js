const express = require('express');
const router = express.Router();
const controller = require('./accountController');
const passport = require("../../config/passport");
const upload = require('../../config/multer');
const cloudinary = require('../../config/cloudinary');

// GET Method
// router.get('/page', controller.paging);
router.get('/:id', controller.get);
// router.get('/', controller.getAll);

// POST Method
router.post('/', controller.insert);
router.post('/avatar', upload.single('avatar'), async function (req, res) {
  try {
    if (req.file.path) {
      const result = await cloudinary.uploader.upload(req.file.path);
      res.json(result);
    }
  } catch (e) {
    console.log(e)
  }
});

// PUT Method
router.put('/:id', upload.single('avatar'), controller.update);

// DELETE Method
router.delete('/:id', controller.delete);

module.exports = router;