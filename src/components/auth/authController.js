const accountService = require('../account/accountService');
const passport = require('../../config/passport.config');
const authService = require("../auth/authService");

/**
 * Render trang Login
 * @param req request
 * @param res response
 */
exports.renderLogin = (req, res) => {
  const message  = req.flash("failure_message");
  res.render('auth/views/login', message[0]);
}

exports.renderForgetPasswordForm = (req, res) => {
  res.render("auth/views/forget_password");
}

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
}

/**
 * Render trang register
 * @param req request
 * @param res response
 */
exports.renderRegister = (req, res) => {
  res.render('auth/views/register');
}

exports.login = (req, res, next) => {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash('failure_message', info);
      return res.redirect("/login");
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.redirect('/');
    });
  })(req, res, next);
}

exports.forgetPassword = async (req, res) => {
  try {
    await authService.forgetPassword(req.body);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

/**
 * Dang ky tai khoan
 * @param req request
 * @param res response
 * @returns {Promise<void>}
 */
exports.register = async (req, res) => {
  try {
    const { password } = req.body;
    const { confirmPassword } = req.body;
    if(password !== confirmPassword){
      res.render('auth/views/register', {
        message: 'Xác nhận mật khẩu không đúng'
      });
    }
    else {
      try {
        const newAccount = await accountService.insert(req.body);
        if (!newAccount) {
          res.render('auth/views/register', {
            message: 'Username hoặc Email đã tồn tại'
          });
        } else {
          res.redirect('/login?activate-account');
        }
      } catch (e) {
        res.status(400).json({ message: e.message });
      }
    }
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
}

