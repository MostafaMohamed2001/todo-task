const asyncHandler = require("express-async-handler");

const { UserModel } = require("../../models");
const ApiError = require("../../utils/apiError");
const successResponse = require("../../utils/success-response");
const sanitizeUser = require("../../utils/sanitize-user");
const generateTokens = require("../../utils/generate-token");
const validatePhone = require("../../utils/validate-phone");

module.exports = asyncHandler(async (req, res, next) => {
  const {
    displayName,
    phone,
    level,
    address,
    password,
    experienceYears,
    countryCode,
  } = req.body;

  let formattedPhone;
  try {
    formattedPhone = validatePhone(phone, countryCode);
  } catch (err) {
    return next(new ApiError("Invalid phone number format", 400));
  }

  const existingUser = await UserModel.findOne({ phone: formattedPhone });
  if (existingUser) {
    return next(new ApiError("Phone number is already registered", 409));
  }

  const newUser = await UserModel.create({
    displayName,
    phone: formattedPhone,
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
