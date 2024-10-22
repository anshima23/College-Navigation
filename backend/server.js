const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file

// Import routes
const buildingRoutes = require('./routes/building.routes');
const facultyRoutes = require('./routes/faculty.routes');
const eventRoutes = require('./routes/event.routes');
const userRoutes = require('./routes/user.routes');
const locationRoutes = require('./routes/location.routes');

// Initialize the app
const app = express();
const PORT = process.env.PORT || 3000; // Use PORT from environment or default to 3000

// CORS options
const corsOptions = {
    origin: 'http://localhost:8000', // Allow requests from the frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Allow credentials
};

// Middleware
app.use(cors(corsOptions)); // Enable CORS with options
app.use(express.json()); // Built-in middleware to parse JSON bodies

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1); // Exit process with failure
    }
};

// Use routes
app.use('/api/buildings', buildingRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/users', userRoutes);
app.use('/api/locations', locationRoutes);

// Root route for testing
app.get('/', (req, res) => {
    res.send('Welcome to the College Navigation API!');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack for debugging
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start the server and connect to the database
const startServer = async () => {
    await connectDB(); // Connect to the database first
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
};

// Graceful shutdown
process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('MongoDB connection closed due to app termination');
        process.exit(0);
    });
});

startServer();
