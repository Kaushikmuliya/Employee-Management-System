const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // Importing jwt
const User = require("../models/user");
//const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// New HR registration
router.post("/register", async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Checking if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hashing the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({ name, email, password: hashedPassword, role });

        // Saving to database
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error });
    }
});

// User login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Checking if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Comparing passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generating JWT token
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        // Sending the token back to the user
        res.status(200).json({
            message: "Login Successful",
            token,
        });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
});


// Exporting router
module.exports = router;
