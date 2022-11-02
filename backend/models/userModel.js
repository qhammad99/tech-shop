const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Missing name"],
    maxLength: [30, "can't exceed 30"],
    minLength: [4, "must be more than 5 characters"],
  },
  email: {
    type: String,
    required: [true, "Missing email"],
    unique: true,
    validate: [validator.isEmail, "enter valid email"],
  },
  password: {
    type: String,
    required: [true, "Missing password"],
    minLength: [6, "must be more than 6 characters"],
    select: false, //select false will hide password field during find operation in mongo //not sure: maybe i am wrong
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

// event when save is called before saving this event will run
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    // if password not changed during update, because this event also called on update too
    // then not hash it and go to next step;
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// jwt method for login and signup
userSchema.methods.getJWT = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// generate password reset token
userSchema.methods.getResetPasswordToken = function () {
  // generating token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // hashing and adding reset token to user
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // reset token expire
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("user", userSchema);
