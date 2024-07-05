const express = require("express");
const {
  createExercise,
  updateExercise,
  getExercises,
  deleteExercise,
} = require("../controllers/exerciseController");
const { trainerAuth, adminAuth } = require("../middlewares/authMiddleware");
const router = express.Router();

// @route   POST api/exercises
// @desc    Create a new exercise
// @access  Private (trainer and admin)
router.post("/", trainerAuth, createExercise);

// @route   PUT api/exercises/:id
// @desc    Update an exercise
// @access  Private (trainer and admin)
router.put("/:id", trainerAuth, updateExercise);

// @route   GET api/exercises
// @desc    Get all exercises
// @access  Private (trainer and admin)
router.get("/", trainerAuth, getExercises);

// @route   DELETE api/exercises/:id
// @desc    Delete an exercise
// @access  Private (admin only)
router.delete("/:id", adminAuth, deleteExercise);

module.exports = router;
