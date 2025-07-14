const asyncHandler = require("express-async-handler");
const { TodoModel } = require("../../models");
const successResponse = require("../../utils/success-response");
const ApiError = require("../../utils/apiError");

module.exports = asyncHandler(async (req, res, next) => {
  const { title, desc, image, priority, dueDate } = req.body;

  const todo = await TodoModel.create({
    title,
    desc,
    image,
    priority,
    dueDate,
    user: req.user._id,
  });

  if (!todo) return next(new ApiError("Failed to create ToDo", 400));

  successResponse({ res, statusCode: 201, message: "ToDo created", data: todo });
});