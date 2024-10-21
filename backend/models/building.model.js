// src/models/building.model.js

import mongoose from 'mongoose';

const buildingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    location: {
        type: {
            type: String,
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true,
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            required: true,
        },
    },
}, { timestamps: true });

const Building = mongoose.model('Building', buildingSchema);

export default Building; // Default export
