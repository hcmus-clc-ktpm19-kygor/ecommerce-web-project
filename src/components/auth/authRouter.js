const express = require("express");
const router = express.Router();
const passport = require("../../config/passport.config");
const authController = require("./authController");
const accountController = require("../account/accountController");

// GET methods
// Render trang login
router.get('/login', authController.renderLogin);
// Render trang lấy lại password
router.get('/forget-password', authController.renderForgetPasswordForm);
// Render trang register
router.get('/register', authController.renderRegister);
// Logout
router.get('/logout', authController.logout);
// Verify account
router.get('/activate', accountController.activateAccount);

// Login
router.post('/login', authController.login);
// Forget password
router.post("/forget-password", authController.forgetPassword);
// Register
router.post('/register', authController.register);


module.exports = router;