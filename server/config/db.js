const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async () => {
  try {
    const username = process.env.USERNAME;
    const password = process.env.PASSWORD;
    const db = process.env.DB;
    await mongoose.connect(
      `mongodb+srv://mohamedelfateh:${password}@cluster0.hn6rbqq.mongodb.net/${db}?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("MongoDB connected");
  } catch (err) {
    console.error("err connecting : " + err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
