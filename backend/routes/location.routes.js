// src/routes/location.routes.js
const express = require('express');
const Location = require('../models/location.model');
const router = express.Router();

// Utility function for error responses
const handleErrorResponse = (res, err, statusCode = 500) => {
    return res.status(statusCode).json({ message: err.message });
};

// Get all locations
router.get('/', async (req, res) => {
    try {
        const locations = await Location.find();
        res.json(locations);
    } catch (err) {
        handleErrorResponse(res, err);
    }
});

// Create a new location
router.post('/', async (req, res) => {
    const location = new Location(req.body);
    try {
        // Validate required fields
        if (!location.name || !location.coordinates) {
            return res.status(400).json({ message: 'Name and coordinates are required.' });
        }

        const savedLocation = await location.save();
        res.status(201).json(savedLocation);
    } catch (err) {
        handleErrorResponse(res, err, 400);
    }
});

// Get coordinates for a specific location by name
router.get('/coordinates', async (req, res) => {
    const { name } = req.query;
    console.log('Request received for name:', name); // Log the incoming request

    try {
        const location = await Location.findOne({ name: name });
        console.log('Location query result:', location); // Log what is returned

        if (!location) {
            console.log('Location not found for name:', name); // Log if location is not found
            return res.status(404).json({ message: 'Location not found' });
        }
        
        res.json(location.coordinates);
    } catch (err) {
        console.error('Error fetching location:', err.message);
        res.status(500).json({ message: err.message });
    }
});


// Update a location by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params; // Get the ID from the route parameters
    try {
        const updatedLocation = await Location.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedLocation) {
            return res.status(404).json({ message: 'Location not found' });
        }
        res.json(updatedLocation);
    } catch (err) {
        handleErrorResponse(res, err, 400);
    }
});

// Delete a location by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params; // Get the ID from the route parameters
    try {
        const deletedLocation = await Location.findByIdAndDelete(id);
        if (!deletedLocation) {
            return res.status(404).json({ message: 'Location not found' });
        }
        res.json({ message: 'Location deleted successfully' });
    } catch (err) {
        handleErrorResponse(res, err);
    }
});

// Other CRUD operations can be added similarly.

module.exports = router;
