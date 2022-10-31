// res errors handler
// ErrorHandler class will use inside controller to generate errors
// capture those in app.js with app.use.
// capture come in this file and generate success: false res from here
const ErrorHandler = require("../utils/error-handler");

module.exports = (err, req, res, next) => {
  err.statuscode = err.statuscode || 500;
  err.message = err.message || "Internal server error";

  // wrong mongodb id error -- cast error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid path ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statuscode).json({
    success: false,
    message: err.message,
  });
};
