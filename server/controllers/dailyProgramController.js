const User = require("../models/User");
const DailyProgram = require("../models/DailyProgram");

exports.getDailyPrograms = async (req, res) => {
  try {
    const dailyPrograms = await DailyProgram.find({ user: req.user.id })
      .populate("exercises")
      .populate("meals");
    res.json(dailyPrograms);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.createDailyProgram = async (req, res) => {
  const { exercises, meals } = req.body;

  try {
    const exerciseIds = [];
    const mealIds = [];

    // Process exercises
    for (const exercise of exercises) {
      if (exercise._id) {
        // Use existing exercise
        exerciseIds.push(exercise._id);
      } else {
        // Create new exercise
        const newExercise = new Exercise(exercise);
        await newExercise.save();
        exerciseIds.push(newExercise._id);
      }
    }

    // Process meals
    for (const meal of meals) {
      if (meal._id) {
        // Use existing meal
        mealIds.push(meal._id);
      } else {
        // Create new meal
        const newMeal = new Nutrition(meal);
        await newMeal.save();
        mealIds.push(newMeal._id);
      }
    }

    const dailyProgram = new DailyProgram({
      exercises: exerciseIds,
      meals: mealIds,
    });

    await dailyProgram.save();
    res.json(dailyProgram);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
