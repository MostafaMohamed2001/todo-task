const asyncHandler = require("express-async-handler");
const { TodoModel } = require("../../models");
const successResponse = require("../../utils/success-response");

module.exports = asyncHandler(async (req, res) => {
  const todos = await TodoModel.find({ user: req?.user?._id });
  successResponse({ res, statusCode: 200, message: "All ToDos", data: todos });
});
