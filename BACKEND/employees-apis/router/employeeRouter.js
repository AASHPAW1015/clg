const express = require('express')
const Employee = require("../models/Employee");
const router = express.Router();

router.get("/",async (request,response)=>{
  try {
    const employees = await Employee.find({});
    response.status(200).json(employees);
  } catch (error) {
    response.status(500).json({message:error.message});

  }
});


router.post("/",async (request,response)=>{
  try {
    const newEmployee = {
      name : request.body.name,
      email : request.body.email,
      department : request.body.department,
      role : request.body.role,
      salary : request.body.salary
    };
    const employee = new Employee(newEmployee);
    await employee.save();
    response.status(201).json({message:"Employee created successfully", employee});
  } catch(error) {
    response.status(500).json({message:error.message});
  }
});

router.put("/:id",async (request,response)=>{
  try {
    const employee = await Employee.findByIdAndUpdate(request.params.id,request.body,{new:true});
    response.status(200).json({message:"Employee updated successfully",employee});
  } catch(error) {
  response.status(500).json({message:error.message});
  }
});

router.delete("/:id",async (request,response)=>{
  try {
    const employee = await Employee.findByIdAndDelete(request.params.id);
    response.status(200).json({message:"Employee deleted successfully", employee});
  } catch (error){
    response.status(500).json({message:error.message});
  }
});

module.exports = router;
