const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  employeeId: String,
  name: String,
  department: String,
  salary: Number,
  experience: Number,
});

module.exports = mongoose.model("Employee", EmployeeSchema);
