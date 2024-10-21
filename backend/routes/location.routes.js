import express from 'express';
import Location from '../models/location.model.js'; // Ensure the model uses .js extension
import Fuse from 'fuse.js'; // Import Fuse.js for fuzzy searching

const router = express.Router();

// Middleware to validate location data
const validateLocationData = (req, res, next) => {
    const { name, coordinates } = req.body;
    if (!name || !coordinates || !coordinates.type || !coordinates.coordinates) {
        return res.status(400).json({ message: 'Invalid location data' });
    }
    next();
};

// Get all locations
router.get('/', async (req, res) => {
    try {
        const locations = await Location.find();
        res.json(locations);
    } catch (err) {
        console.error(err); // Log error for debugging
        res.status(500).json({ message: 'Server error' });
    }
});

// Get location by name
router.get('/:name', async (req, res) => {
    try {
        const location = await Location.findOne({ name: req.params.name });
        if (location) {
            res.json(location);
        } else {
            res.status(404).json({ message: 'Location not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create a new location
router.post('/', validateLocationData, async (req, res) => {
    const location = new Location(req.body);
    try {
        const savedLocation = await location.save();
        res.status(201).json(savedLocation);
    } catch (err) {
        console.error(err); // Log error for debugging
        res.status(400).json({ message: 'Error creating location' });
    }
});

// Update a location by name
router.put('/:name', validateLocationData, async (req, res) => {
    try {
        const updatedLocation = await Location.findOneAndUpdate(
            { name: req.params.name },
            req.body,
            { new: true } // Return the updated document
        );
        if (updatedLocation) {
            res.json(updatedLocation);
        } else {
            res.status(404).json({ message: 'Location not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete a location by name
router.delete('/:name', async (req, res) => {
    try {
        const deletedLocation = await Location.findOneAndDelete({ name: req.params.name });
        if (deletedLocation) {
            res.json({ message: 'Location deleted successfully' });
        } else {
            res.status(404).json({ message: 'Location not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Fuzzy search route for locations
router.get('/search', async (req, res) => {
    const query = req.query.q; // Get the search query from the frontend

    if (!query) {
        return res.status(400).json({ message: 'Search query is required' });
    }

    try {
        // Fetch all locations from MongoDB
        const locations = await Location.find();

        // Initialize Fuse.js for fuzzy matching
        const fuse = new Fuse(locations, {
            keys: ['name', 'description'], // Search both 'name' and 'description' fields
            threshold: 0.3, // Adjust threshold to control fuzzy matching
        });

        // Perform the fuzzy search with the user's query
        const result = fuse.search(query);

        // If results are found, return them
        if (result.length > 0) {
            return res.json(result.map(item => item.item)); // Return matched locations
        } else {
            return res.status(404).json({ message: 'No matching location found.' });
        }
    } catch (err) {
        console.error('Error during location search:', err.message);
        return res.status(500).json({
            message: 'An error occurred while searching for locations',
            error: err.message,
        });
    }
});


// Other CRUD operations can be added similarly...

export default router; // Export the router as default
