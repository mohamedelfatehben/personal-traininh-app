const Meal = require("../models/Meal");

exports.createMeal = async (req, res) => {
  const { type, image } = req.body;

  try {
    const newMeal = new Meal({ type, image });
    await newMeal.save();
    res.json(newMeal);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getMeals = async (req, res) => {
  try {
    const meals = await Meal.find();
    res.json(meals);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getMealById = async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id);
    if (!meal) {
      return res.status(404).json({ msg: "Meal not found" });
    }
    res.json(meal);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.updateMeal = async (req, res) => {
  const { type, image } = req.body;

  try {
    let meal = await Meal.findById(req.params.id);
    if (!meal) {
      return res.status(404).json({ msg: "Meal not found" });
    }

    meal.type = type || meal.type;
    meal.image = image || meal.image;

    await meal.save();
    res.json(meal);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.deleteMeal = async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id);
    if (!meal) {
      return res.status(404).json({ msg: "Meal not found" });
    }

    await meal.remove();
    res.json({ msg: "Meal removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
