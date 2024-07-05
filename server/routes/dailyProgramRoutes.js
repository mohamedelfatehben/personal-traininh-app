const express = require("express");
const { getDailyPrograms } = require("../controllers/dailyProgramController");
const { trainerAuth } = require("../middlewares/authMiddleware");
const router = express.Router();

// @route   GET api/daily-programs
// @desc    Get all daily programs for logged in user
// @access  Private
router.get("/", trainerAuth, getDailyPrograms);

module.exports = router;
