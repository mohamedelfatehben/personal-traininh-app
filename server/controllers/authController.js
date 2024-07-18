const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register a new user
// Register a new user
exports.register = async (req, res) => {
  let { name, email, password, role } = req.body;

  // Default role to "trainee" if not provided
  if (!role) {
    role = "trainee";
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Set trainee-specific fields to default values if the role is 'trainee'
    const traineeFields =
      role === "trainee"
        ? {
            age: null,
            height: null,
            weight: null,
            trainingFrequency: "",
            foodAllergies: [],
            budget: null,
            fitnessGoals: "",
            gender: "",
          }
        : {};

    user = new User({
      name,
      email,
      password,
      role,
      ...traineeFields, // Add trainee-specific fields to the user
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
        name: user.name, // Include name in the payload
        role: user.role,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "5h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
// Login user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: user.id,
        name: user.name, // Include name in the payload
        role: user.role, // Include role in the payload
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "5h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Add a new trainer
exports.addTrainer = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all required fields" });
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new User({ name, email, password, role: "trainer" });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.json({ msg: "Trainer added successfully", user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
