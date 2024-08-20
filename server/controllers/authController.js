const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

// Register a new user
// Register a new user
exports.register = async (req, res) => {
  let { name, email, password, role, phoneNumber } = req.body; // Include phoneNumber in the destructuring

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
      phoneNumber, // Include phoneNumber in the user creation
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

// Generate a random token for password reset
const generateResetToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

// Send password reset email
const sendResetEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS, // Your email password
    },
  });

  const mailOptions = {
    from: `"Nabil Sport" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "طلب إعادة تعيين كلمة المرور",
    html: `
      <div style="font-family: sans-serif; color: #333;text-align: center;">
        <h2 style="text-align: center; color: #4CAF50;">إعادة تعيين كلمة المرور</h2>
        <p style="text-align: right;">
          لقد طلبت إعادة تعيين كلمة المرور الخاصة بك. انقر على الزر أدناه لإعادة تعيين كلمة المرور:
        </p>
        <div style="text-align: center; margin: 20px;">
          <a href="${
            process.env.FRONTEND_URL
          }/reset-password/${token}" style="padding: 10px 20px; color: white; background-color: #4CAF50; text-decoration: none; border-radius: 5px;">
            إعادة تعيين كلمة المرور
          </a>
        </div>
        <p style="text-align: right;">
          إذا لم تطلب إعادة تعيين كلمة المرور، فيرجى تجاهل هذه الرسالة.
        </p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="text-align: center; font-size: 12px; color: #999;">
          &copy; ${new Date().getFullYear()} Nabil Sport . جميع الحقوق محفوظة.
        </p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

// Request password reset
exports.requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "User with this email does not exist" });
    }

    const resetToken = generateResetToken();
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    await sendResetEmail(email, resetToken);

    res.status(200).json({ msg: "Password reset link sent to your email" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Reset password
exports.resetPassword = async (req, res) => {
  const { token, password } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ msg: "Invalid or expired token" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ msg: "Password has been reset" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
