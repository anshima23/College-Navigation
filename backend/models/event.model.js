// src/models/event.model.js

import mongoose from 'mongoose';

// Define the Event schema
const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    dateTime: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
});

// Create the Event model
const Event = mongoose.model('Event', eventSchema);

export default Event; // Export the model
