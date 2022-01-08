const accountService = require("../account/accountService");
const passport = require("../../config/passport.config");
const authService = require("../auth/authService");

/*************************** GET methods ***************************/
/**
 * Render trang Login
 * @param req request
 * @param res response
 */
exports.renderLogin = (req, res) => {
  const message = req.flash("failure_message");
  res.render("auth/views/login", message[0]);
};

exports.renderChangePasswordForm = (req, res) => {
  const message = req.flash("failure_message");
  res.render("auth/views/change_password", { message: message[0] });
};

exports.renderResetPasswordForm = (req, res) => {
  // Kiểm tra thời gian còn hiệu lực của email lấy lại mật khẩu
  // Nếu quá 1 phút thì huỷ bỏ
  if (Date.now() - req.query.curr_time > 60000) {
    req.flash(
      "failure_message",
      "Email lấy lại mật khẩu hết hiệu lực, vui lòng thử lại!"
    );
    res.redirect("/forget-password");
    return;
  }

  const message = req.flash("failure_message");
  res.render("auth/views/reset_password", { message: message[0] });
};

exports.renderForgetPasswordForm = (req, res) => {
  const message = req.flash("failure_message");
  const successMessage = req.flash("message");
  res.render("auth/views/forget_password", {
    message: message[0],
    successMessage: successMessage[0],
  });
};

/**
 * Render trang register
 * @param req request
 * @param res response
 */
exports.renderRegister = (req, res) => {
  res.render("auth/views/register");
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect("/");
};

exports.login = (req, res, next) => {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash("failure_message", info);
      return res.redirect("/login");
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.redirect("/");
    });
  })(req, res, next);
};

exports.forgetPassword = async (req, res) => {
  try {
    await authService.forgetPassword(req.body);
    req.flash(
      "message",
      "Vui lòng kiểm tra mail của bạn. Nếu không thấy hãy thử lại!"
    );
    res.redirect("/forget-password");
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

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
    if (password !== confirmPassword) {
      res.render("auth/views/register", {
        message: "Xác nhận mật khẩu không đúng",
      });
    } else {
      try {
        const newAccount = await accountService.insert(req.body);
        if (!newAccount) {
          res.render("auth/views/register", {
            message: "Username hoặc Email đã tồn tại",
          });
        } else {
          res.redirect("/login?activate-account");
        }
      } catch (e) {
        res.status(400).json({ message: e.message });
      }
    }
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const isSuccess = await authService.changePassword(
      req.session.passport.user._id,
      req.body
    );

    if (isSuccess) {
      res.redirect(`/account/${req.session.passport.user._id}`);
    } else {
      req.flash(
        "failure_message",
        "Mật khẩu cũ hoặc xác nhận mật khẩu mới không hợp lệ"
      );
      res.redirect("/change-password");
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const isSuccess = await authService.resetPassword(req.body);

    if (isSuccess) {
      res.redirect("/login");
    } else {
      req.flash("failure_message", "Xác nhận mật khẩu mới không hợp lệ");
      res.redirect(`/reset-password?email=${req.body.email}`);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
