const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  plan: { type: mongoose.Schema.Types.ObjectId, ref: "Plan", required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  type: { type: String, enum: ["remote", "on site"], required: true },
  status: {
    type: String,
    enum: ["pending", "accepted", "denied"],
    default: "pending",
  },
  image: { type: String }, // Optional, only needed for remote payments
  subscriptionEnd: { type: Date }, // Subscription expiration date required if status accepted
});

module.exports = mongoose.model("Payment", PaymentSchema);
