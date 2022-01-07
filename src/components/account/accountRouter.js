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

//PA test
router.get('/:id/pw',function (req,res){
    try {
        // const account = await service.getById(req.params.id);
        // res.render('account/views/account_detail', {account});
        res.render('account/views/change_password');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

module.exports = router;
