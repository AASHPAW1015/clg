const express = require('express');
const router = express.Router();
const employee= require('../models/employee');


router.get('/',async (request, response) => {
    try {
        const employees=await  employee.findAll();
        response.status(200).json(employees);
    } catch (error) {
        response.status(500).json({message:error.message});

    }
});
router.get('/:id',async (request, response) => {
    try {
        const foundEmployee=await  employee.findById(request.params.id);
        if(!foundEmployee){
            return response.status(404).json({message:"Employee not Found"});

        }
        response.status(200).json(foundEmployee);
    } catch (error) {
        response.status(500).json({message:error.message});

    }
});
router.post('/',async (request, response) => {
    try {
        const {name,username,email,password,department,role,salary}=request.body;

    if(!name){
        return response.status(400).json({message:"Name field is required"});
    }
    if(!username){  
        return response.status(400).json({message:"Username field is required"});
    }
    if(!email){
        return response.status(400).json({message:"Email field is required"});
    }
    if(!password){
        return response.status(400).json({message:"Password field is required"});
    }
    if(!department){
        return response.status(400).json({message:"Department field is required"});
    }
    if(!role){
        return response.status(400).json({message:"Role field is required"});
    }
    if(!salary){
        return response.status(400).json({message:"Salary field is required"});
    }
    const Employee=await employee.create(request.body);
    response.status(201).json({message:"Employee created successfully",createdEmployee:Employee});
    } catch (error) {
        response.status(500).json({message:error.message});
        
    }
});

router.put('/:id',async (request, response) => {
    try {
        const {name,username,email,password,department,role,salary}=request.body;

    if(!name){
        return response.status(400).json({message:"Name field is required"});
    }
    if(!username){  
        return response.status(400).json({message:"Username field is required"});
    }
    if(!email){
        return response.status(400).json({message:"Email field is required"});
    }
    if(!password){
        return response.status(400).json({message:"Password field is required"});
    }
    if(!department){
        return response.status(400).json({message:"Department field is required"});
    }
    if(!role){
        return response.status(400).json({message:"Role field is required"});
    }
    if(!salary){
        return response.status(400).json({message:"Salary field is required"});
    }
    const Employee=await employee.findByIdandUpdate(request.params.id,request.body);
    if(!Employee){
        return response.status(404).json({message:"Employee not Found"});
        
    }
    response.status(200).json({message:"Employee updated successfully",updatedEmployee:Employee});
    } catch (error) {
        response.status(500).json({message:error.message});
        
    }
});

router.delete('/:id',async (request, response) => {
    try {
        const Employee=await employee.findByIdandDelete(request.params.id);
        if(!Employee){
            return response.status(404).json({message:"Employee not Found"});
            
        }
        response.status(200).json({message:"Employee deleted successfully",deletedEmployee:Employee});
    } catch (error) {
        response.status(500).json({message:error.message});
        
    }
});

module.exports = router;