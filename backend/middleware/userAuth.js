const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const catchAsyncErrors = require("./catchAsyncErrors");
const ErrorHandler = require("../utils/error-handler");

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) return next(new ErrorHandler("Login required to access", 401));

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decoded.id);

  next();
});

exports.authorizeRoles =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(`Role: ${req.user.role} is unathorized for this.`, 403)
      );
    }

    next();
  };
