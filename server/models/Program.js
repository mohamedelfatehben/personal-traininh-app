const mongoose = require("mongoose");

const ProgramSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  days: {
    Monday: { type: mongoose.Schema.Types.ObjectId, ref: "DailyProgram" },
    Tuesday: { type: mongoose.Schema.Types.ObjectId, ref: "DailyProgram" },
    Wednesday: { type: mongoose.Schema.Types.ObjectId, ref: "DailyProgram" },
    Thursday: { type: mongoose.Schema.Types.ObjectId, ref: "DailyProgram" },
    Friday: { type: mongoose.Schema.Types.ObjectId, ref: "DailyProgram" },
    Saturday: { type: mongoose.Schema.Types.ObjectId, ref: "DailyProgram" },
    Sunday: { type: mongoose.Schema.Types.ObjectId, ref: "DailyProgram" },
  },
});

module.exports = mongoose.model("Program", ProgramSchema);
