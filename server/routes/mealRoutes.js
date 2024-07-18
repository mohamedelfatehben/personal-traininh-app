const express = require("express");
const {
  createMeal,
  getMeals,
  getMealById,
  updateMeal,
  deleteMeal,
} = require("../controllers/mealController");
const { trainerAuth, adminAuth } = require("../middlewares/authMiddleware");
const router = express.Router();

// @route   POST api/meals
// @desc    Create a new meal
// @access  Private (trainer only)
router.post("/", trainerAuth, createMeal);

// @route   GET api/meals
// @desc    Get all meals
// @access  Private (trainer and admin)
router.get("/", trainerAuth, getMeals);

// @route   GET api/meals/:id
// @desc    Get meal by ID
// @access  Private (trainer and admin)
router.get("/:id", trainerAuth, getMealById);

// @route   PUT api/meals/:id
// @desc    Update a meal
// @access  Private (trainer only)
router.put("/:id", trainerAuth, updateMeal);

// @route   DELETE api/meals/:id
// @desc    Delete a meal
// @access  Private (trainer only)
router.delete("/:id", trainerAuth, deleteMeal);

module.exports = router;
