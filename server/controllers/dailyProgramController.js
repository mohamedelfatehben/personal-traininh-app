const DailyProgram = require("../models/DailyProgram");

// Get daily programs for a user
exports.getDailyPrograms = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const dailyPrograms = await DailyProgram.find()
      .populate("exercises")
      .limit(Number(limit))
      .skip((page - 1) * Number(limit))
      .exec();

    const count = await DailyProgram.countDocuments();
    const totalPages = Math.ceil(count / limit);

    res.json({ items: dailyPrograms, totalPages });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getAllDailyPrograms = async (req, res) => {
  try {
    const dailyPrograms = await DailyProgram.find({}, "_id name");
    res.json(dailyPrograms);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Create a new daily program
exports.createDailyProgram = async (req, res) => {
  const { name, exercises, meals, calories } = req.body;

  try {
    const dailyProgram = new DailyProgram({
      name,
      exercises,
      meals,
      calories,
    });

    await dailyProgram.save();
    res.json(dailyProgram);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Update a daily program
exports.updateDailyProgram = async (req, res) => {
  const { name, exercises, meals, calories } = req.body;

  try {
    const dailyProgram = await DailyProgram.findById(req.params.id);
    if (dailyProgram) {
      dailyProgram.name = name || dailyProgram.name;
      dailyProgram.exercises = exercises || dailyProgram.exercises;
      dailyProgram.meals = meals || dailyProgram.meals;
      dailyProgram.calories = calories || dailyProgram.calories;
      await dailyProgram.save();
      return res.json(dailyProgram);
    }
    res.status(404).json({ msg: "Daily Program not found" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Delete a daily program
exports.deleteDailyProgram = async (req, res) => {
  try {
    const dailyProgram = await DailyProgram.findById(req.params.id);
    if (dailyProgram) {
      await dailyProgram.deleteOne();
      return res.json({ msg: "Daily Program removed" });
    }
    res.status(404).json({ msg: "Daily Program not found" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
