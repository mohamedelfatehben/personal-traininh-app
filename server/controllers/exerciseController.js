const Exercise = require("../models/Exercise");

exports.createExercise = async (req, res) => {
  const { name, muscleGroup, description, videoUrl } = req.body;
  const image = req.file;

  try {
    const newExercise = new Exercise({
      name,
      muscleGroup,
      description,
      videoUrl,
      image: image.buffer.toString("base64") || "",
    });
    await newExercise.save();
    res.json(newExercise);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getExercises = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const exercises = await Exercise.find()
      .limit(Number(limit))
      .skip((page - 1) * Number(limit))
      .exec();

    const count = await Exercise.countDocuments();
    const totalPages = Math.ceil(count / limit);

    res.json({ items: exercises, totalPages });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getAllExercises = async (req, res) => {
  try {
    const exercises = await Exercise.find({}, "_id name");
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
  const { name, muscleGroup, description, videoUrl } = req.body;
  const image = req.file;

  try {
    let exercise = await Exercise.findById(req.params.id);
    if (!exercise) {
      return res.status(404).json({ msg: "Exercise not found" });
    }

    // Update the exercise properties if provided
    exercise.name = name || exercise.name;
    exercise.muscleGroup = muscleGroup || exercise.muscleGroup;
    exercise.description = description || exercise.description;
    exercise.videoUrl = videoUrl || exercise.videoUrl;

    // Update the image only if a new image file is provided
    if (image) {
      exercise.image = image.buffer.toString("base64");
    }

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

    await exercise.deleteOne();
    res.json({ msg: "Exercise removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
