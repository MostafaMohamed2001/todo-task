const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const { UserModel } = require("../../models");
const ApiError = require("../../utils/apiError");
const generateTokens = require("../../utils/generate-token");
const successResponse = require("../../utils/success-response");

module.exports = asyncHandler(async (req, res, next) => {
  const token = req.query.token;

  if (!token) {
    return next(new ApiError("Refresh token is required", 403));
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  } catch (err) {
    return next(new ApiError("Refresh token is invalid or expired", 403));
  }

  const user = await UserModel.findById(decoded.id);
  if (!user) {
    return next(new ApiError("User not found", 404));
  }

  const { accessToken } = generateTokens({ res, userId: user._id });

  return successResponse({
    res,
    message: "Access token refreshed successfully",
    data: { accessToken },
  });
});
