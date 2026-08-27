const express = require("express");
const Employee = require("../models/Employee");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, async (request, response) => {
  try {
    const employees = await Employee.find();
    response.status(200).json(employees);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

router.get("/:id", authMiddleware, async (request, response) => {
  try {
    const employee = await Employee.findById(request.params.id);

    if (!employee) {
      return response.status(400).json({ message: "Employee not found!!!!!!" });
    }

    response.status(200).json(employee);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

router.post("/", authMiddleware, async (request, response) => {
  try {
    const employee = await Employee.create(request.body);
    response
      .status(201)
      .json({ message: "Employee created successfully!!", employee });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

router.put("/:id", authMiddleware, async (request, response) => {
  try {
    const employee = await Employee.findbyIdAndUpdate(
      request.params.id,
      request.body,
    );
    if (!employee) {
      return request.status(404).json({ message: "Employee not foundd!!" });
    }
    response
      .status(200)
      .json({ message: "Employee Updated successfully!!", employee });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

router.delete("/:id", authMiddleware, async (request, response) => {
  try {
    const employee = await Employee.findbyIdAndDelete(
      request.params.id,
      request.body,
    );
    if (!employee) {
      return request.status(404).json({ message: "Employee not foundd!!" });
    }
    response
      .status(200)
      .json({ message: "Employee deleted successfully!!", employee });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

module.exports = router;
