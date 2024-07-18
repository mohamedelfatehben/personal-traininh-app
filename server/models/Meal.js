const mongoose = require("mongoose");

const MealSchema = new mongoose.Schema({
  type: { type: String, required: true },
  image: { type: String, required: true }, // Added image field
});

module.exports = mongoose.model("Meal", MealSchema);
