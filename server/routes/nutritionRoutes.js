const express = require("express");
const {
  createNutrition,
  updateNutrition,
  getNutritions,
  deleteNutrition,
} = require("../controllers/nutritionController");
const router = express.Router();

// @route   POST api/nutritions
// @desc    Create a new nutrition plan
// @access  Private
router.post("/", createNutrition);

// @route   PUT api/nutritions/:id
// @desc    Update a nutrition plan
// @access  Private
router.put("/:id", updateNutrition);

// @route   GET api/nutritions
// @desc    Get all nutrition plans
// @access  Private
router.get("/", getNutritions);

// @route   DELETE api/nutritions/:id
// @desc    Delete a nutrition plan
// @access  Private
router.delete("/:id", deleteNutrition);

module.exports = router;
