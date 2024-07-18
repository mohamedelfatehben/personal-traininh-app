const mongoose = require("mongoose");

const PlanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: {
    type: String,
    enum: ["exercise", "exercise and nutrition"],
    required: true,
  },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  paymentType: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Plan", PlanSchema);
