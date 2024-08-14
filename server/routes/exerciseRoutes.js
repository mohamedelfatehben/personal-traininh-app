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
const multer = require("multer");
const router = express.Router();

//For converting image to base 64
const storage = multer.memoryStorage();
const upload = multer({ storage });

// @route   POST api/exercises
// @desc    Create a new exercise
// @access  Private (trainer only)
router.post("/", trainerAuth, upload.single("image"), createExercise);

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
router.put("/:id", trainerAuth, upload.single("image"), updateExercise);

// @route   DELETE api/exercises/:id
// @desc    Delete an exercise
// @access  Private (trainer only)
router.delete("/:id", trainerAuth, deleteExercise);

module.exports = router;
