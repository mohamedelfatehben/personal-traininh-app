const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const app = express();

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const planRoutes = require("./routes/planRoutes");
const dailyProgramRoutes = require("./routes/dailyProgramRoutes");
const exerciseRoutes = require("./routes/exerciseRoutes");
const programRoutes = require("./routes/programRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());
app.use(cors());

// Define Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/daily-programs", dailyProgramRoutes);
app.use("/api/exercises", exerciseRoutes);
app.use("/api/programs", programRoutes);
app.use("/api/payments", paymentRoutes);
app.get("/", (req, res) => res.json("Hello"));

module.exports = app;
