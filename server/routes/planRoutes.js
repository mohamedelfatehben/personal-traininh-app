const express = require("express");
const {
  createPlan,
  updatePlan,
  getPlans,
  deletePlan,
} = require("../controllers/planController");
const { adminAuth } = require("../middlewares/authMiddleware");
const router = express.Router();

// @route   POST api/plans
// @desc    Create a new plan
// @access  Private (admin only)
router.post("/", adminAuth, createPlan);

// @route   PUT api/plans/:id
// @desc    Update a plan
// @access  Private (admin only)
router.put("/:id", adminAuth, updatePlan);

// @route   GET api/plans
// @desc    Get all plans
// @access  Private (admin only)
router.get("/", adminAuth, getPlans);

// @route   DELETE api/plans/:id
// @desc    Delete a plan
// @access  Private (admin only)
router.delete("/:id", adminAuth, deletePlan);

module.exports = router;
