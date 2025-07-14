const asyncHandler = require("express-async-handler");
const successResponse = require("../../utils/success-response");

module.exports = asyncHandler(async (req, res, next) => {
  res.clearCookie("refreshToken");
  successResponse({
    res,
    message: "Logged out successfully",
  });
});
