const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const accountService = require('../components/account/accountService');

passport.use(new LocalStrategy(
    async (username, password, done) => {
      const account = await accountService.getByUsername(username);
      if (!account) {
        return done(null, false, { message: 'Incorrect username' })
      }
      if (!await accountService.validatePassword(account, password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, account);
    }
));

passport.serializeUser(function(user, done) {
  done(null, user.username);
});

passport.deserializeUser(async function(user, done) {
  done(null, user);
});

module.exports = passport;