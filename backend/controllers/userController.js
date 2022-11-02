const User = require("../models/userModel");
const ErrorHandler = require("../utils/error-handler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/sendToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const { findOne } = require("../models/userModel");

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "id of avatar",
      url: "url of avatar",
    },
  });

  sendToken(user, 201, res);
});

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // check have email and password

  if (!email || !password)
    return next(new ErrorHandler("Both email and password required", 400));

  // find in database on the basis of email
  // select is false for password, thats why we have to pass it separately
  const user = await User.findOne({ email }).select("+password");

  if (!user) return next(new ErrorHandler("Invalid email or password", 401));

  //   if found then compare password
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched)
    return next(new ErrorHandler("Invalid email or password", 401));

  sendToken(user, 200, res);
});

exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  const options = {
    expires: new Date(Date.now()),
    httpOnly: true,
  };

  res.status(200).cookie("token", null, options).json({
    success: true,
    message: "logout successfully",
  });
});

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("user not found", 404));
  }

  // get reset password token
  const resetToken = user.getResetPasswordToken();

  // getResetPasswordToken() will change resett token and its expire in user
  // but not save in database; for this we saving in database first;
  await user.save({ validateBeforeSave: false });

  // we can't give static protocolo (http or https) thats why we use req; same for host
  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Your password reset  token is :- \n\n ${resetPasswordUrl} \n\n
  If you have not this email, ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Tech-Shop Password recover`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email send to ${user.email} successfully!`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // hashing again so we can compare hash - hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  // to check expiry we check if expiry time is greater than current time then it is valid;
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user)
    return next(
      new ErrorHandler("reset password token invalid or expired", 401)
    );

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendToken(user, 200, res);
});
