const express = require("express");
const {
  createPlan,
  updatePlan,
  getPlans,
  deletePlan,
} = require("../controllers/planController");
const { auth, trainerAuth } = require("../middlewares/authMiddleware");
const router = express.Router();

// @route   POST api/plans
// @desc    Create a new plan
// @access  Private (trainer only)
router.post("/", trainerAuth, createPlan);

// @route   PUT api/plans/:id
// @desc    Update a plan
// @access  Private (trainer only)
router.put("/:id", trainerAuth, updatePlan);

// @route   GET api/plans
// @desc    Get all plans
// @access  Public
router.get("/", auth, getPlans);

// @route   DELETE api/plans/:id
// @desc    Delete a plan
// @access  Private (trainer only)
router.delete("/:id", trainerAuth, deletePlan);

module.exports = router;
