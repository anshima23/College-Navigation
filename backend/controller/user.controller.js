// src/controllers/user.controller.js

const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

// Get all users
const getAllUsers = async (req, res) => {
   try{
       const users=await User.find().select('-passwordHash'); // Exclude password hash from response
       // Add other fields as necessary
       return(res.json(users))
   }catch(err){
       return(res.sendStatus(500))
   }
}

// Get a specific user by ID
const getUserById=async(req,res)=>{
   try{
       const user=await User.findById(req.params.id)
       if(!user)return(res.sendStatus(404));
       return(res.json(user))
   }catch(err){
       return(res.sendStatus(500))
   }
}

// Create a new user
const createUser=async(req,res)=>{
   const user=new User(req.body); // Make sure to send the passwordHash in the request body.
   try{
       const savedUser=await user.save();
       return(res.sendStatus(201))
   }catch(err){
       return(res.sendStatus(400))
   }
}

// Update a user
const updateUser=async(req,res)=>{
   try{
       const updatedUser=await User.findByIdAndUpdate(req.params.id, req.body,{new:true});
       if(!updatedUser)return(res.sendStatus(404));
       return(res.json(updatedUser))
   }catch(err){
       return(res.sendStatus(400))
   }
}

// Delete a user
const deleteUser=async(req,res)=>{
   try{
       const deletedUser=await User.findByIdAndDelete(req.params.id)
       if(!deletedUser)return(res.sendStatus(404));
       return(res.sendStatus(204))
   }catch(err){
       return(res.sendStatus(500))
   }
}

// User login function to generate JWT token
const loginUser=async(req,res)=>{
   const {username,password}=req.body;
   // Find user by username and compare password here...
}

// Export functions for use in routes
module.exports={
   getAllUsers,
   getUserById,
   createUser,
   updateUser,
   deleteUser,
   loginUser // Include this if you implement login functionality.
}