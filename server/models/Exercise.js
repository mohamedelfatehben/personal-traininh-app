const mongoose = require("mongoose");

const ExerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  muscleGroup: { type: String, required: true },
  videoUrl: { type: String },
  description: { type: String, required: true }, // Added description field
  image: { type: String, required: true }, // Added image field
});

module.exports = mongoose.model("Exercise", ExerciseSchema);
