const mongoose = require("mongoose");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  isAdmin: {
    type: Boolean,
    required: false,
    default: false
  },
  photoUrl: {
    type: String,
    required: false,
  },
  booksBorrowed: {
    type: Number,
    required: false,
    default: 0
  },
  registered: {
    type: Date,
    default: Date.now,
  },
  hash: String,
  salt: String,
});

// Set salt and hash the password 
UserSchema.methods.setPassword = function (password) {
  // Creating salt
  this.salt = crypto.randomBytes(16).toString("hex");

  // Hashing user salt and password with 1000 iterations
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);
};

// Check password is correct or not
UserSchema.methods.isValidPassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return this.hash === hash;
};

module.exports = mongoose.model("User", UserSchema);
