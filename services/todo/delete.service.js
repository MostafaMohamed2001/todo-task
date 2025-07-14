const asyncHandler = require("express-async-handler");
const { TodoModel } = require("../../models");
const ApiError = require("../../utils/apiError");
const successResponse = require("../../utils/success-response");

module.exports = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const userId = req?.user?.id;

  const deleted = await TodoModel.findOneAndDelete({ _id: id, user: userId });
  if (!deleted) return next(new ApiError("ToDo not found", 404));

  successResponse({ res, message: "ToDo deleted successfully" });
});
