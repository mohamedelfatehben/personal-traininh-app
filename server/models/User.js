const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number },
  height: { type: Number },
  weight: { type: Number },
  trainingFrequency: { type: String },
  foodAllergies: { type: [String] },
  budget: { type: Number },
  fitnessGoals: { type: String },
  role: {
    type: String,
    enum: ["admin", "trainer", "trainee"],
    default: "trainee",
  },
  program: { type: mongoose.Schema.Types.ObjectId, ref: "Program" }, // Added program reference
});

module.exports = mongoose.model("User", UserSchema);
