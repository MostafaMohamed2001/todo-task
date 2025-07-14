const { validationResult } = require("express-validator");
const ApiError = require("../utils/apiError");

const validateMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMsg = errors.array()[0].msg;
    return next(new ApiError(errorMsg, 400));
  }
  next();
};

module.exports = validateMiddleware;