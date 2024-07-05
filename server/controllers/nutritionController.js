const Nutrition = require("../models/Nutrition");

exports.createNutrition = async (req, res) => {
  const { day, meals } = req.body;

  try {
    const nutrition = new Nutrition({ day, meals });
    await nutrition.save();
    res.json(nutrition);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.updateNutrition = async (req, res) => {
  const { day, meals } = req.body;

  try {
    const nutrition = await Nutrition.findById(req.params.id);
    if (nutrition) {
      nutrition.day = day || nutrition.day;
      nutrition.meals = meals || nutrition.meals;
      await nutrition.save();
      return res.json(nutrition);
    }
    res.status(404).json({ msg: "Nutrition plan not found" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getNutritions = async (req, res) => {
  try {
    const nutritions = await Nutrition.find();
    res.json(nutritions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.deleteNutrition = async (req, res) => {
  try {
    const nutrition = await Nutrition.findById(req.params.id);
    if (nutrition) {
      await nutrition.remove();
      return res.json({ msg: "Nutrition plan removed" });
    }
    res.status(404).json({ msg: "Nutrition plan not found" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
