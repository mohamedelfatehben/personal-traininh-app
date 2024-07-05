const express = require("express");
const {
  createProgram,
  updateProgram,
  getPrograms,
  deleteProgram,
} = require("../controllers/programController");
const { trainerAuth, adminAuth } = require("../middlewares/authMiddleware");
const router = express.Router();

// @route   POST api/programs
// @desc    Create a new program
// @access  Private (trainer and admin)
router.post("/", trainerAuth, createProgram);

// @route   PUT api/programs/:id
// @desc    Update a program
// @access  Private (trainer and admin)
router.put("/:id", trainerAuth, updateProgram);

// @route   GET api/programs
// @desc    Get all programs
// @access  Private (trainer and admin)
router.get("/", trainerAuth, getPrograms);

// @route   DELETE api/programs/:id
// @desc    Delete a program
// @access  Private (admin only)
router.delete("/:id", adminAuth, deleteProgram);

module.exports = router;
