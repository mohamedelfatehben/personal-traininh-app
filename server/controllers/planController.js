const Plan = require("../models/Plan");

exports.createPlan = async (req, res) => {
  const { name, type, description, price, paymentType, days } = req.body;

  try {
    const plan = new Plan({
      name,
      type,
      description,
      price,
      paymentType,
      days,
    });
    await plan.save();
    res.json(plan);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.updatePlan = async (req, res) => {
  const { name, type, description, price, paymentType, days } = req.body;

  try {
    const plan = await Plan.findById(req.params.id);
    if (plan) {
      plan.name = name || plan.name;
      plan.type = type || plan.type;
      plan.description = description || plan.description;
      plan.price = price || plan.price;
      plan.paymentType = paymentType || plan.paymentType;
      plan.days = paymentType === "by day" ? days || plan.days : plan.days;
      await plan.save();
      return res.json(plan);
    }
    res.status(404).json({ msg: "Plan not found" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getPlans = async (req, res) => {
  try {
    const plans = await Plan.find();
    res.json(plans);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.deletePlan = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);
    if (plan) {
      await plan.remove();
      return res.json({ msg: "Plan removed" });
    }
    res.status(404).json({ msg: "Plan not found" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
