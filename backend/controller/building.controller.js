// src/controllers/building.controller.js

const Building = require('../models/building.model');

// Get all buildings
const getAllBuildings = async (req, res) => {
    try {
        const buildings = await Building.find();
        res.json(buildings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a specific building by ID
const getBuildingById = async (req, res) => {
    try {
        const building = await Building.findById(req.params.id);
        if (!building) return res.status(404).json({ message: 'Building not found' });
        res.json(building);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new building
const createBuilding = async (req, res) => {
    const building = new Building(req.body);
    try {
        const savedBuilding = await building.save();
        res.status(201).json(savedBuilding);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update a building
const updateBuilding = async (req, res) => {
    try {
        const updatedBuilding = await Building.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBuilding) return res.status(404).json({ message: 'Building not found' });
        res.json(updatedBuilding);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a building
const deleteBuilding = async (req, res) => {
    try {
        const deletedBuilding = await Building.findByIdAndDelete(req.params.id);
        if (!deletedBuilding) return res.status(404).json({ message: 'Building not found' });
        res.json({ message: 'Building deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllBuildings,
    getBuildingById,
    createBuilding,
    updateBuilding,
    deleteBuilding,
};