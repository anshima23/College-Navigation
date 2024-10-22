import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import Fuse from 'fuse.js'; // Import Fuse.js for fuzzy searching

// Load environment variables from .env file
dotenv.config();

// Import routes
import buildingRoutes from './routes/building.routes.js';
import facultyRoutes from './routes/faculty.routes.js';
import eventRoutes from './routes/event.routes.js';
import userRoutes from './routes/user.routes.js';
import locationRoutes from './routes/location.routes.js';
import Location from './models/location.model.js'; // Import the Location model

// Initialize the app
const app = express();
const PORT = process.env.PORT || 5000; // Default to port 5000 if not in .env
const MONGOURL = process.env.MONGODB_URI;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(MONGOURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1); // Exit process with failure
    }
};

// Add the new /api/locations route
app.get('/api/locations', (req, res) => {
    const locations = [
        { name: 'Location A', coordinates: [40.712776, -74.005974], connections: [] },
        { name: 'Location B', coordinates: [34.052235, -118.243683], connections: [] }
    ];
    res.json(locations);  // Ensure this sends JSON
});

// Define the fuzzy search route using Fuse.js
app.get('/api/locations/search', async (req, res) => {
    const query = req.query.q; // Get the search query from the URL (e.g., /search?q=location)

    if (!query) {
        return res.status(400).json({ message: 'Search query is required' });
    }

    try {
        // Fetch all locations from MongoDB
        const locations = await Location.find();

        // Initialize Fuse.js for fuzzy matching
        const fuse = new Fuse(locations, {
            keys: ['name'], // Search based on the 'name' field in locations
            threshold: 0.3, // Adjust the threshold to control the fuzzy matching level
        });

        // Perform the fuzzy search with the user's query
        const result = fuse.search(query);

        // If results are found, return them
        if (result.length > 0) {
            return res.json(result.map(item => item.item)); // Send matched locations
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

// Use other routes
app.use('/api/buildings', buildingRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/users', userRoutes);
app.use('/api/locations', locationRoutes);

// Root route for testing
app.get('/', (req, res) => {
    return res.send('Welcome to the College Navigation API!');
});

// Test route for getData
app.get("/getData", (req, res) => {
    res.send("Hello");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack for debugging
    return res.status(500).json({
        message: 'Something went wrong!',
        error: err.message,
    });
});

// Start the server and connect to the database
const startServer = async () => {
    await connectDB(); // Connect to the database first
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
};

// Handle uncaught exceptions and unhandled promise rejections
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err.message);
    process.exit(1); // Exit process with failure
});

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err.message);
    process.exit(1); // Exit process with failure
});

// Start the server
startServer();
