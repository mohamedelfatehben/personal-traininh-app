const express = require("express");
const {
  createDailyProgram,
  getDailyPrograms,
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

module.exports = router;
