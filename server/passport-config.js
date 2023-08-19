const LocalStrategy = require("passport-local");
const User = require("./models/user");

const initializePassport = (passport) => {
  const authenticateUser = async (email, password, cb) => {
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        return cb(null, false, { message: "User not found" });
      }
      if (!user.isValidPassword(password)) {
        return cb(null, false, { message: "Password incorrect" });
      } else {
        return cb(null, user);
      }
    } catch (err) {
      return cb(err);
    }
  };

  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};

module.exports = initializePassport;
