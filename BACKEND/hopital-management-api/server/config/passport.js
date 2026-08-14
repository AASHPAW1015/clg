const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const bcrypt = require("bcryptjs");
const User = require("../models/Users");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "invalid credentials!" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return done(null, false, { message: "invalid credentials!" });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }),
);

module.exports = passport;
