const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number, default: null },
  height: { type: Number, default: null },
  weight: { type: Number, default: null },
  trainingFrequency: { type: String, default: "" },
  foodAllergies: { type: [String], default: [] },
  budget: { type: Number, default: null },
  fitnessGoals: { type: String, default: "" },
  gender: { type: String, enum: ["male", "female", ""], default: "" },
  phoneNumber: { type: String, default: "" }, // Added phoneNumber field
  role: {
    type: String,
    enum: ["admin", "trainer", "trainee"],
    default: "trainee",
  },
  currentPlan: { type: mongoose.Schema.Types.ObjectId, ref: "Plan" },
  currentPayment: { type: mongoose.Schema.Types.ObjectId, ref: "Payment" },
  nextPayment: { type: mongoose.Schema.Types.ObjectId, ref: "Payment" },
  subscriptionEnd: { type: Date },
  program: { type: mongoose.Schema.Types.ObjectId, ref: "Program" },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
});

module.exports = mongoose.model("User", UserSchema);
