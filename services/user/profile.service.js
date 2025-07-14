const asyncHandler = require("express-async-handler");
const successResponse = require("../../utils/success-response");
const { UserModel } = require("../../models");
const ApiError = require("../../utils/apiError");
const sanitizeUser = require("../../utils/sanitize-user");

module.exports = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findById(req.user.id);

  if (!user) {
    return next(new ApiError("User profile not found", 404));
  }

  successResponse({
    res,
    statusCode: 200,
    message: "Profile fetched successfully",
    data: sanitizeUser(user),
  });
});
