const mongoose = require("mongoose");

const DailyProgramSchema = new mongoose.Schema({
  exercises: [{ type: mongoose.Schema.Types.ObjectId, ref: "Exercise" }],
  meals: [
    {
      meal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Meal",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
});

module.exports = mongoose.model("DailyProgram", DailyProgramSchema);
