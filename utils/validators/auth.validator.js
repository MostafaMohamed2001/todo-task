const { body } = require("express-validator");

const validateMiddleware = require("../../middlewares/validate");
const { levels } = require("../../config/constants");

exports.signupValidator = [
  body("displayName")
    .notEmpty()
    .withMessage("Display name is required")
    .isLength({ min: 3 })
    .withMessage("Display name must be at least 3 characters"),

  body("phone").notEmpty().withMessage("Phone number is required"),

  body("countryCode").notEmpty().withMessage("Country code is required"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),

  body("address").notEmpty().withMessage("Address is required"),

  body("experienceYears")
    .notEmpty()
    .withMessage("Experience years is required")
    .isInt({ min: 0 })
    .withMessage("Experience years must be a positive number"),

  body("level")
    .optional()
    .isIn(Object.values(levels))
    .withMessage("Invalid level"),

  validateMiddleware,
];
