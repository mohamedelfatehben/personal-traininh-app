const express = require("express");
const {
  register,
  login,
  requestPasswordReset,
  resetPassword,
} = require("../controllers/authController");
const router = express.Router();

// @route   POST api/auth/register
// @desc    Register user
// @access  Public
router.post("/register", register);

// @route   POST api/auth/login
// @desc    Login user
// @access  Public
router.post("/login", login);

// Request password reset
router.post("/request-password-reset", requestPasswordReset);

// Reset password
router.post("/reset-password", resetPassword);

module.exports = router;
