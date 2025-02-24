const express = require("express");
const Employee = require("../models/employee"); // Import Employee model

const router = express.Router();

// Create a new employee
router.post("/", async (req, res) => {
  try {
      const { name, email, position } = req.body;
      const newEmployee = new Employee({ name, email, position });
      await newEmployee.save();
      res.status(201).json(newEmployee);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});


// Get all employees
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Error fetching employees", error });
  }
});

// Get a specific employee by ID
router.get("/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: "Error fetching employee", error });
  }
});

// Update an employee
router.put("/:id", async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: "Employee updated successfully", updatedEmployee });
  } catch (error) {
    res.status(500).json({ message: "Error updating employee", error });
  }
});

// Delete an employee
router.delete("/:id", async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting employee", error });
  }
});

module.exports = router;
