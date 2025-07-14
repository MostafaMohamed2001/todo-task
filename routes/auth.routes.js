const express = require("express");
const {
  registerUser,
  loginUser,
  refreshAccessToken,
  protect,
  profile,
} = require("../services/user");
const { signupValidator } = require("../utils/validators/auth.validator");

const router = express.Router();

// @route   POST /api/v1/auth/register
// @desc    Register a new user
// @access  Public
router.post("/register", signupValidator, registerUser);

// @route   POST /api/v1/auth/login
// @desc    Login user and return access token
// @access  Public
router.post("/login", loginUser);

// @route   GET /api/v1/auth/refresh-token
// @desc    Refresh access token using refresh token in cookie
// @access  Public (relies on httpOnly cookie)
router.get("/refresh-token", refreshAccessToken);

// @route   GET /api/v1/auth/profile
// @desc    Get logged-in user profile
// @access  Private (requires valid access token)
router.get("/profile", protect, profile);

module.exports = router;
