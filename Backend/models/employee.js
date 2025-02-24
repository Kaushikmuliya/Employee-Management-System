const express = require("express");
const Employee = require("../models/employee");

const router = express.Router();

// ✅ Create a new employee (POST)
router.post("/", async (req, res) => {
  try {
    console.log("Received Data:", req.body); // ✅ Debugging Log

    const { name, email, position, salary, dateOfJoining } = req.body;

    // 🔴 Validate request body
    if (!name || !email || !position || !salary) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newEmployee = new Employee({
      name,
      email,
      position,
      salary,
      dateOfJoining: dateOfJoining || new Date() // Defaults to current date
    });

    await newEmployee.save();
    res.status(201).json(newEmployee); // ✅ Successfully Created
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Get all employees (GET)
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch employees" });
  }
});

// ✅ Get employee by ID (GET)
router.get("/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ error: "Employee not found" });
    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json({ error: "Invalid Employee ID" });
  }
});

// ✅ Update employee by ID (PUT)
router.put("/:id", async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEmployee) return res.status(404).json({ error: "Employee not found" });
    res.status(200).json(updatedEmployee);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});

// ✅ Delete employee by ID (DELETE)
router.delete("/:id", async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) return res.status(404).json({ error: "Employee not found" });
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Deletion failed" });
  }
});

module.exports = router;
