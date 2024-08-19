const mongoose = require("mongoose");

const PlanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: {
    type: String,
    enum: ["exercise", "nutrition", "exercise and nutrition"],
    required: true,
  },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  paymentType: {
    type: String,
    enum: ["monthly", "by day"],
    required: true,
  },
  days: { type: Number, default: 0 }, // only used when paymentType is "by day"
});

module.exports = mongoose.model("Plan", PlanSchema);
