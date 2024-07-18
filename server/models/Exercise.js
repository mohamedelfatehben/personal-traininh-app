const mongoose = require("mongoose");

const ExerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  muscleGroup: { type: String, required: true },
  description: { type: String, required: true },
  videoUrl: { type: String }, // Optional
  image: { type: String }, // Optional
});

module.exports = mongoose.model("Exercise", ExerciseSchema);
