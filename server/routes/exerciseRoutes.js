const express = require("express");
const {
  createExercise,
  getExercises,
  getExerciseById,
  updateExercise,
  deleteExercise,
  getAllExercises,
} = require("../controllers/exerciseController");
const { trainerAuth } = require("../middlewares/authMiddleware");
const router = express.Router();

// @route   POST api/exercises
// @desc    Create a new exercise
// @access  Private (trainer only)
router.post("/", trainerAuth, createExercise);

// @route   GET api/exercises
// @desc    Get all exercises
// @access  Private (trainer and admin)
router.get("/", trainerAuth, getExercises);
// @route   GET api/exercises
// @desc    Get all exercises
// @access  Private (trainer and admin)
router.get("/all-exercises", trainerAuth, getAllExercises);

// @route   GET api/exercises/:id
// @desc    Get exercise by ID
// @access  Private (trainer and admin)
router.get("/:id", trainerAuth, getExerciseById);

// @route   PUT api/exercises/:id
// @desc    Update an exercise
// @access  Private (trainer only)
router.put("/:id", trainerAuth, updateExercise);

// @route   DELETE api/exercises/:id
// @desc    Delete an exercise
// @access  Private (trainer only)
router.delete("/:id", trainerAuth, deleteExercise);

module.exports = router;
