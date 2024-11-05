// src/models/event.model.js

import mongoose from 'mongoose';

// Define the Event schema
const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    Time: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String, // URL of the event image
        required: true,
    },
    category: {
        type: String,
        enum: ['previous', 'running', 'future'], // Define categories
        required: true,
    },
});

// Create the Event model
const Event = mongoose.model('Event', eventSchema);

export default Event; // Export the model
