const User = require("../models/User");
const Program = require("../models/Program");
const DailyProgram = require("../models/DailyProgram");
const Exercise = require("../models/Exercise");
const Plan = require("../models/Plan");

// Get user profile
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password")
      .populate("currentPlan")
      .populate("currentPayment")
      .populate("nextPayment")
      .populate({
        path: "program",
        populate: {
          path: "days.Monday days.Tuesday days.Wednesday days.Thursday days.Friday days.Saturday days.Sunday",
          populate: {
            path: "exercises",
          },
        },
      });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (user.role === "trainee") {
      const nextPaymentPlan = user.nextPayment
        ? await Plan.findById(user.nextPayment.plan)
        : null;

      return res.json({
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        height: user.height,
        weight: user.weight,
        trainingFrequency: user.trainingFrequency,
        foodAllergies: user.foodAllergies,
        budget: user.budget,
        fitnessGoals: user.fitnessGoals,
        gender: user.gender,
        role: user.role,
        currentPlan: user.currentPlan ? user.currentPlan : null,
        currentPayment: user.currentPayment ? user.currentPayment : null,
        subscriptionEnd: user.subscriptionEnd,
        nextPayment: user.nextPayment
          ? { ...user.nextPayment._doc, plan: nextPaymentPlan }
          : null,
        program: user.program,
        phoneNumber: user.phoneNumber,
      });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Update user profile
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
    phoneNumber, // Include phoneNumber in the destructuring
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
        user.phoneNumber = phoneNumber || user.phoneNumber; // Update phoneNumber
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

// Assign a program to a trainee
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
          const exerciseIds = dailyProgramData.exercises.map((exercise) => {
            if (exercise._id) {
              return exercise._id;
            } else {
              const newExercise = new Exercise(exercise);
              newExercise.save();
              return newExercise._id;
            }
          });

          // Create new daily program
          const newDailyProgram = new DailyProgram({
            name: dailyProgramData.name,
            exercises: exerciseIds,
            meals: dailyProgramData.meals,
            calories: dailyProgramData.calories,
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

// Get all trainees
exports.getAllTrainees = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const filterStatus = req.query.filterStatus || "";
    const filterNextPaymentStatus = req.query.filterNextPaymentStatus || "";
    const filterPlan = req.query.filterPlan || "";
    const skip = (page - 1) * limit;

    const query = { role: "trainee" };

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    if (filterStatus) {
      query.subscriptionEnd =
        filterStatus === "active" ? { $gt: new Date() } : { $lte: new Date() };
    }

    if (filterPlan) {
      query.currentPlan = filterPlan;
    }

    const trainees = await User.find(query)
      .populate("currentPlan")
      .populate("currentPayment")
      .populate({
        path: "nextPayment",
        populate: {
          path: "plan",
        },
      })
      .populate("program")
      .skip(skip)
      .limit(limit)
      .select("-password");

    if (filterNextPaymentStatus) {
      const filteredTrainees = trainees.filter(
        (trainee) =>
          trainee.nextPayment &&
          trainee.nextPayment.status === filterNextPaymentStatus
      );
      res.json({
        trainees: filteredTrainees,
        totalPages: Math.ceil(filteredTrainees.length / limit),
        currentPage: page,
      });
    } else {
      const totalTrainees = await User.countDocuments(query);
      res.json({
        trainees,
        totalPages: Math.ceil(totalTrainees / limit),
        currentPage: page,
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
