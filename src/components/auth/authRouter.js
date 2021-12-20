const express = require("express");
const router = express.Router();
const passport = require("../../config/passport.config");
const authController = require("./authController");

// GET methods
// Render trang login
router.get('/login', authController.renderLogin);
// Render trang register
router.get('/register', authController.renderRegister);
// Logout
router.get('/logout', authController.logout);

// POST methods
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login?invalid-account'
}));

// router.post('/login',
//     passport.authenticate('local'),
//     function(req, res) {
//       const page = req.query.page;
//       console.log(page);
//       if(page){
//         res.redirect(page);
//       }
//       res.redirect("/");
//     });
router.post('/register', authController.register);


module.exports = router;