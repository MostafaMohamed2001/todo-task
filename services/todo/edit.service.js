const asyncHandler = require("express-async-handler");
const { TodoModel } = require("../../models");
const ApiError = require("../../utils/apiError");
const successResponse = require("../../utils/success-response");

module.exports = asyncHandler(async (req, res, next) => {
  const { title, desc, image, priority, dueDate } = req.body;
  const todo = await TodoModel.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { title, desc, image, priority, dueDate },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!todo) return next(new ApiError("Failed to update ToDo", 404));

  successResponse({
    res,
    statusCode: 200,
    message: "ToDo updated",
    data: todo,
  });
});
