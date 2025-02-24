const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

// Initialize Express App
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Built-in JSON parser (no need for bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })); // For form data parsing

// Import Routes
const employeeRoutes = require("./routes/employeeRoutes"); // ✅ Ensure correct path
app.use("/api/employees", employeeRoutes); // ✅ Route Middleware

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected Successfully!"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Basic Route
app.get("/", (req, res) => {
  res.send("Employee Management System API is running...");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
