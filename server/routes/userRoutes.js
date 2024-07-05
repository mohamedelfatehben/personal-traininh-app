const express = require("express");
const {
  getUser,
  updateUser,
  assignProgram,
} = require("../controllers/userController");
const { addTrainer } = require("../controllers/authController");
const {
  auth,
  adminAuth,
  trainerAuth,
} = require("../middlewares/authMiddleware");
const router = express.Router();

// @route   GET api/users/me
// @desc    Get user profile
// @access  Private
router.get("/me", auth, getUser);

// @route   PUT api/users/me
// @desc    Update user profile
// @access  Private
router.put("/me", auth, updateUser);

// @route   POST api/users/add-trainer
// @desc    Add a new trainer
// @access  Private (admin only)
router.post("/add-trainer", adminAuth, addTrainer);

// @route   POST api/users/assign-program
// @desc    Assign a program to a trainee
// @access  Private (trainer only)
router.post("/assign-program", trainerAuth, assignProgram);

module.exports = router;
