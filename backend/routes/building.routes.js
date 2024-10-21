import express from 'express';
import mongoose from 'mongoose'; // Import mongoose
import Building from '../models/building.model.js';

const router = express.Router();

// Middleware to validate building data
const validateBuildingData = (req, res, next) => {
    const { name, description, location } = req.body;
    if (!name || !description || !location || !location.type || !location.coordinates) {
        return res.status(400).json({ message: 'Invalid building data' });
    }
    next();
};

// Get all buildings
router.get('/', async (req, res) => {
    try {
        const buildings = await Building.find();
        res.json(buildings);
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ message: 'Server error' });
    }
});

// Get a specific building by ID
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id.trim(); // Trim to remove newlines and spaces

        // Check if it's a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send('Invalid Building ID');
        }

        const building = await Building.findById(id);
        
        if (!building) {
            return res.status(404).send('Building not found');
        }

        res.json(building);
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).send(err.message || 'Internal Server Error');
    }
});

// Create a new building
router.post('/', validateBuildingData, async (req, res) => {
    const building = new Building(req.body);
    try {
        const savedBuilding = await building.save();
        res.status(201).json(savedBuilding);
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(400).json({ message: 'Error creating building' });
    }
});

// Update a building
router.put('/:id', validateBuildingData, async (req, res) => {
    try {
        const updatedBuilding = await Building.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBuilding) return res.status(404).json({ message: 'Building not found' });
        res.json(updatedBuilding);
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(400).json({ message: 'Error updating building' });
    }
});

// Delete a building
router.delete('/:id', async (req, res) => {
    try {
        const deletedBuilding = await Building.findByIdAndDelete(req.params.id);
        if (!deletedBuilding) return res.status(404).json({ message: 'Building not found' });
        res.json({ message: 'Building deleted successfully' });
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ message: 'Server error' });
    }
});

export default router; // Use export default
