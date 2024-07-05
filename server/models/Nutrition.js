const mongoose = require("mongoose");

const NutritionSchema = new mongoose.Schema({
  day: { type: String, required: true },
  meals: [
    {
      name: { type: String, required: true },
      calories: { type: Number, required: true },
    },
  ],
});

module.exports = mongoose.model("Nutrition", NutritionSchema);
