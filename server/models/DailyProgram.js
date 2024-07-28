const mongoose = require("mongoose");

const DailyProgramSchema = new mongoose.Schema({
  name: { type: String, required: true },
  exercises: [{ type: mongoose.Schema.Types.ObjectId, ref: "Exercise" }],
  meals: [
    {
      meal: {
        type: String,
        required: true,
      },
      quantity: { type: String, required: true },
    },
  ],
  calories: { type: String, required: true },
});

module.exports = mongoose.model("DailyProgram", DailyProgramSchema);
