const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const accountService = require('../components/account/accountService');

passport.use(new LocalStrategy(
    async (username, password, done) => {
      const user = await accountService.getByUsername(username);
      if (!user) {
        return done(null, false, { message: 'Tài khoản không tồn tại.' })
      }
      if (!(await accountService.validatePassword(user, password))) {
        return done(null, false, { message: "Password không hợp lệ." });
      }
      if (!user.status) {
        return done(null, false, { message: "Tài khoản chưa kích hoạt, vui lòng kiểm tra mail." });
      }
      return done(null, user);
    }
));

passport.serializeUser(function(user, done) {
  done(null, {
      _id: user._id,
      username: user.username,
      email: user.email,
      name: user.name,
      phone: user.phone,
      address: user.address,
      sex: user.sex,
      dob: user.dob,
      avatar_url: user.avatar_url
  });
});

passport.deserializeUser(async function(user, done) {
  done(null, user);
});

module.exports = passport;