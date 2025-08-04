// src/models/event.model.js

import mongoose from 'mongoose';

// Define the Event schema
// models/event.model.js
const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  dateTime: { type: Date, required: true }, // unified date and time
  location: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: {
    type: String,
    enum: ['previous', 'running', 'future'],
    required: true,
  },
});


// Create the Event model
const Event = mongoose.model('Event', eventSchema);

export default Event; // Export the model
