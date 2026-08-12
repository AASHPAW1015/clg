const mongoose = require("mongoose");

const employeeSchema = {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  department: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
};

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;
