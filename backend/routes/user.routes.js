// src/routes/user.routes.js

const express = require('express');
const User = require('../models/user.model');

const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        // Exclude password hash from response
        const usersWithoutPasswordHash = users.map(user => ({
            id: user._id,
            username: user.username,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            // Add other fields as necessary
        }));
        
        res.json(usersWithoutPasswordHash);
        
    } catch (err) {
       return  res.status(500).json({ message: err.message });
    }
});

// Get a specific user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new user
router.post('/', async (req, res) => {
    const user = new User(req.body); // Make sure to send the passwordHash in the request body.
    try {
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch(err){
        res.status(400).json({message : err.message})
    }
});

// Update a user
router.put('/:id', async (req, res)=> {
    try{
        const updatedUser=await User.findByIdAndUpdate(req.params.id, req.body,{new:true});
        if(!updatedUser)return(res.sendStatus(404));
        res.json(updatedUser)
    }catch(err){
        res.sendStatus(400)
    }
});

// Delete a user
router.delete('/:id',async(req,res)=>{
   try{
       const deletedUser=await User.findByIdAndDelete(req.params.id)
       if(!deletedUser)return(res.sendStatus(404));
       return(res.sendStatus(204))
   }catch(err){
       return(res.sendStatus(500))
   }
})

module.exports=router;