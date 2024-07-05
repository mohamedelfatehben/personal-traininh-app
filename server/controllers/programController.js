const Program = require("../models/Program");
const DailyProgram = require("../models/DailyProgram");

exports.createProgram = async (req, res) => {
  const { name, description, days } = req.body;

  try {
    const program = new Program({ name, description, days });
    await program.save();
    res.json(program);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.updateProgram = async (req, res) => {
  const { name, description, days } = req.body;

  try {
    const program = await Program.findById(req.params.id);
    if (program) {
      program.name = name || program.name;
      program.description = description || program.description;
      program.days = days || program.days;
      await program.save();
      return res.json(program);
    }
    res.status(404).json({ msg: "Program not found" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getPrograms = async (req, res) => {
  try {
    const programs = await Program.find().populate(
      "days.Monday days.Tuesday days.Wednesday days.Thursday days.Friday days.Saturday days.Sunday"
    );
    res.json(programs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.deleteProgram = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);
    if (program) {
      await program.remove();
      return res.json({ msg: "Program removed" });
    }
    res.status(404).json({ msg: "Program not found" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
