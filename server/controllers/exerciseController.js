const Exercise = require("../models/Exercise");

exports.createExercise = async (req, res) => {
  const { name, muscleGroup, description, videoUrl, image } = req.body;

  try {
    const newExercise = new Exercise({
      name,
      muscleGroup,
      description,
      videoUrl,
      image,
    });
    await newExercise.save();
    res.json(newExercise);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getExercises = async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.json(exercises);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getExerciseById = async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    if (!exercise) {
      return res.status(404).json({ msg: "Exercise not found" });
    }
    res.json(exercise);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.updateExercise = async (req, res) => {
  const { name, muscleGroup, description, videoUrl, image } = req.body;

  try {
    let exercise = await Exercise.findById(req.params.id);
    if (!exercise) {
      return res.status(404).json({ msg: "Exercise not found" });
    }

    exercise.name = name || exercise.name;
    exercise.muscleGroup = muscleGroup || exercise.muscleGroup;
    exercise.description = description || exercise.description;
    exercise.videoUrl = videoUrl || exercise.videoUrl;
    exercise.image = image || exercise.image;

    await exercise.save();
    res.json(exercise);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.deleteExercise = async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    if (!exercise) {
      return res.status(404).json({ msg: "Exercise not found" });
    }

    await exercise.remove();
    res.json({ msg: "Exercise removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
