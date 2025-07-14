const { body } = require("express-validator");
const validateMiddleware = require("../../middlewares/validate");
const { priority } = require("../../config/constants");

exports.createTodoValidator = [
  body("title")
    .notEmpty().withMessage("Title is required")
    .isLength({ min: 3 }).withMessage("Title must be at least 3 characters")
    .isLength({ max: 100 }).withMessage("Title must be less than 100 characters"),

  body("desc")
    .optional()
    .isLength({ max: 500 }).withMessage("Description must be less than 500 characters"),

  body("image")
    .optional()
    .isString().withMessage("Image must be a string"),

  body("priority")
    .optional()
    .isIn(Object.values(priority)).withMessage("Priority must be one of: low, medium, high"),

  body("dueDate")
    .optional()
    .isISO8601().withMessage("Due date must be a valid date")
    .custom((value) => {
      if (new Date(value) < new Date()) {
        throw new Error("Due date must be in the future");
      }
      return true;
    }),

  validateMiddleware,
];

exports.updateTodoValidator = [
  body("title")
    .optional()
    .isLength({ min: 3 }).withMessage("Title must be at least 3 characters")
    .isLength({ max: 100 }).withMessage("Title must be less than 100 characters"),

  body("desc")
    .optional()
    .isLength({ max: 500 }).withMessage("Description must be less than 500 characters"),

  body("image")
    .optional()
    .isString().withMessage("Image must be a string"),

  body("priority")
    .optional()
    .isIn(Object.values(priority)).withMessage("Priority must be one of: low, medium, high"),

  body("dueDate")
    .optional()
    .isISO8601().withMessage("Due date must be a valid date")
    .custom((value) => {
      if (new Date(value) < new Date()) {
        throw new Error("Due date must be in the future");
      }
      return true;
    }),

  validateMiddleware,
];