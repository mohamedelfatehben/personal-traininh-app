const DailyProgram = require("../models/DailyProgram");
const Exercise = require("../models/Exercise");
const Meal = require("../models/Meal");

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
    const mealEntries = [];

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
    for (const mealEntry of meals) {
      const { meal, quantity } = mealEntry;
      let mealId;

      if (meal._id) {
        // Use existing meal
        mealId = meal._id;
      } else {
        // Create new meal
        const newMeal = new Meal(meal);
        await newMeal.save();
        mealId = newMeal._id;
      }

      mealEntries.push({ meal: mealId, quantity });
    }

    const dailyProgram = new DailyProgram({
      exercises: exerciseIds,
      meals: mealEntries,
    });

    await dailyProgram.save();
    res.json(dailyProgram);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
