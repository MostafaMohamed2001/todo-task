const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const successResponse = require("../utils/success-response");

const uploadImage = asyncHandler(async (req, res, next) => {
  const image = req.file;

  if (!image) {
    return next(new ApiError("No image uploaded", 400));
  }

  successResponse({
    res,
    statusCode: 201,
    message: "Image uploaded successfully",
    data: {
      filename: image.filename,
      path: image.path,
      mimetype: image.mimetype,
    },
  });
});

module.exports = uploadImage;
