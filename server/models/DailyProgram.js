const mongoose = require("mongoose");

const DailyProgramSchema = new mongoose.Schema({
  exercises: [{ type: mongoose.Schema.Types.ObjectId, ref: "Exercise" }],
  meals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Nutrition" }],
});

module.exports = mongoose.model("DailyProgram", DailyProgramSchema);
