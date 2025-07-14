const asyncHandler = require("express-async-handler");

const { UserModel } = require("../../models");
const ApiError = require("../../utils/apiError");
const successResponse = require("../../utils/success-response");
const sanitizeUser = require("../../utils/sanitize-user");
const generateTokens = require("../../utils/generate-token");

module.exports = asyncHandler(async (req, res, next) => {
  const { displayName, phone, level, address, password, experienceYears } =
    req.body;

  const newUser = await UserModel.create({
    displayName,
    phone,
    level,
    address,
    password,
    experienceYears,
  });

  if (!newUser) return next(new ApiError("Registration failed", 400));

  const user = sanitizeUser(newUser);
  const { accessToken } = generateTokens({ res, userId: user._id });

  successResponse({
    res,
    statusCode: 201,
    message: "User registered successfully",
    data: { user, accessToken },
  });
});
