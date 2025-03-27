
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  position: {
    type: String,
    required: true
  },
  salary: {
    type: Number,
    required: true
  },
  dateOfJoining: {
    type: Date,
    default: Date.now
  }
},
  {versionKey:false});

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;  // Ensure the model is exported correctly
