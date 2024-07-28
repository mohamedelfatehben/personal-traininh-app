const express = require("express");
const {
  createDailyProgram,
  getDailyPrograms,
  updateDailyProgram,
  deleteDailyProgram,
  getAllDailyPrograms,
} = require("../controllers/dailyProgramController");
const { trainerAuth } = require("../middlewares/authMiddleware");
const router = express.Router();

// @route   POST api/daily-programs
// @desc    Create a new daily program
// @access  Private (trainer only)
router.post("/", trainerAuth, createDailyProgram);

// @route   GET api/daily-programs
// @desc    Get all daily programs for logged in user
// @access  Private
router.get("/", trainerAuth, getDailyPrograms);
// @route   GET api/daily-programs
// @desc    Get all daily programs for logged in user
// @access  Private
router.get("/all-daily-programs", trainerAuth, getAllDailyPrograms);

// @route   PUT api/daily-programs/:id
// @desc    Update a daily program
// @access  Private (trainer only)
router.put("/:id", trainerAuth, updateDailyProgram);

// @route   DELETE api/daily-programs/:id
// @desc    Delete a daily program
// @access  Private (trainer only)
router.delete("/:id", trainerAuth, deleteDailyProgram);

module.exports = router;
