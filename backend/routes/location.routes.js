// src/routes/location.routes.js
const express = require('express');
const Location = require('../models/location.model');
const router = express.Router();

// Get all locations
router.get('/', async (req, res) => {
    try {
        const locations = await Location.find();
        res.json(locations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new location
router.post('/', async (req, res) => {
    const location = new Location(req.body);
    try {
        const savedLocation = await location.save();
        res.status(201).json(savedLocation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Other CRUD operations (Update/Delete) can be added similarly.

module.exports = router;