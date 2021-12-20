const express = require("express");
const router = express.Router();
const passport = require("../../config/passport.config");
const authController = require("./authController");
const accountController = require("../account/accountController");

// GET methods
// Render trang login
router.get('/login', authController.renderLogin);
// Render trang register
router.get('/register', authController.renderRegister);
// Logout
router.get('/logout', authController.logout);
// Verify account
router.get('/activate', accountController.activateAccount);

// POST methods
// router.post('/login', passport.authenticate('local', {
//   successRedirect: '/',
//   failureRedirect: '/login?invalid-account'
// }));
// Login
router.post('/login', authController.login);
// Register
router.post('/register', authController.register);


module.exports = router;