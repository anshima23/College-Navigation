// src/routes/user.routes.js
import express from 'express';
import User from '../models/user.model.js'; // Ensure the model uses .js extension

const router = express.Router();

// Middleware to validate user data
const validateUserData = (req, res, next) => {
    const { username, passwordHash } = req.body;
    if (!username || !passwordHash) {
        return res.status(400).json({ message: 'Invalid user data' });
    }
    next();
};

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
        }));

        res.json(usersWithoutPasswordHash);
    } catch (err) {
        console.error(err); // Log error for debugging
        return res.status(500).json({ message: err.message });
    }
});

// Get a specific user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        // Exclude password hash from response
        const { passwordHash, ...userWithoutPasswordHash } = user.toObject();
        return res.json(userWithoutPasswordHash);
    } catch (err) {
        console.error(err); // Log error for debugging
        return res.status(500).json({ message: err.message });
    }
});

// Create a new user
router.post('/', validateUserData, async (req, res) => {
    const user = new User(req.body); // Make sure to send the passwordHash in the request body.
    try {
        const savedUser = await user.save();
        return res.status(201).json(savedUser);
    } catch (err) {
        console.error(err); // Log error for debugging
        return res.status(400).json({ message: err.message });
    }
});

// Update a user
router.put('/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) return res.sendStatus(404);
        return res.json(updatedUser);
    } catch (err) {
        console.error(err); // Log error for debugging
        return res.sendStatus(400);
    }
});

// Delete a user
router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.sendStatus(404);
        return res.sendStatus(204);
    } catch (err) {
        console.error(err); // Log error for debugging
        return res.sendStatus(500);
    }
});

export default router; // Export the router as default
