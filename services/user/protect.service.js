const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const { UserModel } = require("../../models");
const ApiError = require("../../utils/apiError");

module.exports = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token || token === "null") {
    return next(
      new ApiError("Not logged in. Please login to access this route.", 401)
    );
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  } catch (err) {
    return next(new ApiError("Invalid or expired token", 401));
  }

  const currentUser = await UserModel.findById(decoded.id);
  if (!currentUser) {
    return next(
      new ApiError("The user belonging to this token no longer exists.", 401)
    );
  }

  req.user = currentUser;
  next();
});