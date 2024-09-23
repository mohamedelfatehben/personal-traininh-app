const express = require("express");
const {
  getUser,
  updateUser,
  assignProgram,
  getAllTrainees,
  updateUserFormImages,
} = require("../controllers/userController");
const {
  auth,
  trainerAuth,
  adminAuth,
} = require("../middlewares/authMiddleware");
const router = express.Router();

const multer = require("multer");
const { addTrainer } = require("../controllers/authController");
const storage = multer.memoryStorage();
const upload = multer({ storage });

// @route   POST api/users/add-trainer
// @desc    Post user profile
// @access  Private
router.post("/add-trainer", adminAuth, addTrainer);

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

// @route   POST api/users/update-images
// @desc    Update user's form images
// @access  Private (authenticated user)
router.put(
  "/form-images",
  auth,
  upload.array("images", 3),
  updateUserFormImages
);

module.exports = router;
