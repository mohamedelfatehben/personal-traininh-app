const User = require("../models/User");
const Program = require("../models/Program");
const DailyProgram = require("../models/DailyProgram");
const Exercise = require("../models/Exercise");
const Nutrition = require("../models/Meal");

// Get user profile
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Update user profile
exports.updateUser = async (req, res) => {
  const {
    age,
    height,
    weight,
    trainingFrequency,
    foodAllergies,
    budget,
    fitnessGoals,
    gender,
  } = req.body;

  try {
    const user = await User.findById(req.user.id);

    if (user) {
      // Only update fields that are relevant to the user's role
      if (user.role === "trainee") {
        user.age = age || user.age;
        user.height = height || user.height;
        user.weight = weight || user.weight;
        user.trainingFrequency = trainingFrequency || user.trainingFrequency;
        user.foodAllergies = foodAllergies || user.foodAllergies;
        user.budget = budget || user.budget;
        user.fitnessGoals = fitnessGoals || user.fitnessGoals;
        user.gender = gender || user.gender;
      }
      await user.save();
      return res.json(user);
    }
    res.status(404).json({ msg: "User not found" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.assignProgram = async (req, res) => {
  const { userId, programId, programData } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user || user.role !== "trainee") {
      return res.status(404).json({ msg: "Trainee not found" });
    }

    let program;
    if (programId) {
      // Assign existing program
      program = await Program.findById(programId);
      if (!program) {
        return res.status(404).json({ msg: "Program not found" });
      }
    } else if (programData) {
      // Create new daily programs if provided in programData
      const days = {};
      for (const [day, dailyProgramData] of Object.entries(programData.days)) {
        if (dailyProgramData._id) {
          // Use existing daily program
          days[day] = dailyProgramData._id;
        } else {
          // Process exercises and meals for new daily program
          const exerciseIds = [];
          const mealIds = [];

          for (const exercise of dailyProgramData.exercises) {
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

          for (const meal of dailyProgramData.meals) {
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

          // Create new daily program
          const newDailyProgram = new DailyProgram({
            exercises: exerciseIds,
            meals: mealIds,
          });
          await newDailyProgram.save();
          days[day] = newDailyProgram._id;
        }
      }

      // Create new program with the created or existing daily programs
      program = new Program({
        name: programData.name,
        description: programData.description,
        days,
      });
      await program.save();
    } else {
      return res
        .status(400)
        .json({ msg: "Program data or program ID is required" });
    }

    user.program = program._id;
    await user.save();

    res.json({ msg: "Program assigned successfully", user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getAllTrainees = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const trainees = await User.find({ role: "trainee" })
      .skip(skip)
      .limit(limit)
      .select("-password"); // Exclude password field

    const totalTrainees = await User.countDocuments({ role: "trainee" });

    res.json({
      trainees,
      totalPages: Math.ceil(totalTrainees / limit),
      currentPage: page,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
