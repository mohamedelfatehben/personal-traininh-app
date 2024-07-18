const express = require("express");
const {
  getUser,
  updateUser,
  assignProgram,
  getAllTrainees,
} = require("../controllers/userController");
const { auth, trainerAuth } = require("../middlewares/authMiddleware");
const router = express.Router();

// @route   GET api/users/me
// @desc    Get user profile
// @access  Private
router.get("/me", auth, getUser);

// @route   PUT api/users/me
// @desc    Update user profile
// @access  Private
router.put("/me", auth, updateUser);

// @route   POST api/users/assign-program
// @desc    Assign a program to a trainee
// @access  Private (trainer only)
router.post("/assign-program", trainerAuth, assignProgram);

// @route   GET api/users/trainees
// @desc    Get all trainees with pagination
// @access  Private (admin and trainer)
router.get("/trainees", trainerAuth, getAllTrainees);

module.exports = router;
