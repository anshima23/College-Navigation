import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import Fuse from 'fuse.js'; // Import Fuse.js for fuzzy searching
import http from 'http'; // Import http for creating the server
import { Server } from 'socket.io'; // Correctly import Server from socket.io

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
app.use(cors(
    {
        origin:["https://deploy-mern-lwhq.vercel.app"],
        methods:["POST","GET"],
        credentials:true
    }
));
app.use(express.json())

const PORT = process.env.PORT || 5000; // Default to port 5000 if not in .env
const MONGOURL = process.env.MONGODB_URI;

// Middleware
app.use(cors({ origin: true }));
app.use(express.json()); // Parse JSON bodies

// Create HTTP server and integrate with Socket.IO
const server = http.createServer(app);
const io = new Server(server); // Initialize Socket.IO with the HTTP server

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

// Socket.IO connection handling
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Listen for location updates from the client
    socket.on("send-location", (data) => {
        io.emit("receive-location", { id: socket.id, ...data }); // Broadcast location to all clients
    });

    // Handle user disconnect
    socket.on("disconnect", () => {
        io.emit("user-disconnected", socket.id); // Notify others that this user has disconnected
        console.log("User disconnected:", socket.id);
    });
});

// Example route for fetching locations (you can modify this as needed)
app.get('/api/locations', async (req, res) => {
    try {
        const locations = await Location.find(); // Fetch locations from MongoDB
        res.json(locations);  // Send JSON response
    } catch (error) {
        res.status(500).json({ message: 'Error fetching locations' });
    }
});

// Define the fuzzy search route using Fuse.js (if applicable)
app.get('/api/locations/search', async (req, res) => {
    const query = req.query.q; // Get the search query from the URL

    if (!query) {
        return res.status(400).json({ message: 'Search query is required' });
    }

    try {
        const locations = await Location.find(); // Fetch all locations

        const fuse = new Fuse(locations, {
            keys: ['name'], // Search based on the 'name' field in locations
            threshold: 0.3,
        });

        const result = fuse.search(query);

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

// Use other routes for buildings, faculty, events, users (define these routes in separate files)
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
    server.listen(PORT, () => {
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