// src/routes/building.routes.js

const express = require('express');
const Building = require('../models/building.model');

const router = express.Router();

// Get all buildings
router.get('/', async (req, res) => {
    try {
        const buildings = await Building.find();
        res.json(buildings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a specific building by ID
router.get('/:id', async (req, res) => {
    try {
        const building = await Building.findById(req.params.id);
        if (!building) return res.status(404).json({ message: 'Building not found' });
        res.json(building);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new building
router.post('/', async (req, res) => {
    const building = new Building(req.body);
    try {
        const savedBuilding = await building.save();
        res.status(201).json(savedBuilding);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a building
router.put('/:id', async (req, res) => {
    try {
        const updatedBuilding = await Building.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBuilding) return res.status(404).json({ message: 'Building not found' });
        res.json(updatedBuilding);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a building
router.delete('/:id', async (req, res) => {
    try {
        const deletedBuilding = await Building.findByIdAndDelete(req.params.id);
        if (!deletedBuilding) return res.status(404).json({ message: 'Building not found' });
        res.json({ message: 'Building deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;