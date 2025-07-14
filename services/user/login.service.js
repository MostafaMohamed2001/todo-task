const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const { UserModel } = require("../../models");
const ApiError = require("../../utils/apiError");
const successResponse = require("../../utils/success-response");
const sanitizeUser = require("../../utils/sanitize-user");
const generateTokens = require("../../utils/generate-token");

module.exports = asyncHandler(async (req, res, next) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    return next(new ApiError("Phone and password are required", 400));
  }

  const userDoc = await UserModel.findOne({ phone }).select("+password");
  if (!userDoc) return next(new ApiError("Invalid phone or password", 401));

  const isMatch = await bcrypt.compare(password, userDoc.password);
  if (!isMatch) return next(new ApiError("Invalid phone or password", 401));

  const user = sanitizeUser(userDoc);
  const { accessToken } = generateTokens({ res, userId: user._id });

  successResponse({
    res,
    message: "Login successful",
    data: { user, accessToken },
  });
});
