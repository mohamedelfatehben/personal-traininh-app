const Exercise = require("../models/Exercise");

exports.createExercise = async (req, res) => {
  const { name, muscleGroup, videoUrl, description, image } = req.body;

  try {
    const exercise = new Exercise({
      name,
      muscleGroup,
      videoUrl,
      description,
      image,
    });
    await exercise.save();
    res.json(exercise);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.updateExercise = async (req, res) => {
  const { name, muscleGroup, videoUrl, description, image } = req.body;

  try {
    const exercise = await Exercise.findById(req.params.id);
    if (exercise) {
      exercise.name = name || exercise.name;
      exercise.muscleGroup = muscleGroup || exercise.muscleGroup;
      exercise.videoUrl = videoUrl || exercise.videoUrl;
      exercise.description = description || exercise.description;
      exercise.image = image || exercise.image;
      await exercise.save();
      return res.json(exercise);
    }
    res.status(404).json({ msg: "Exercise not found" });
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

exports.deleteExercise = async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    if (exercise) {
      await exercise.remove();
      return res.json({ msg: "Exercise removed" });
    }
    res.status(404).json({ msg: "Exercise not found" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
