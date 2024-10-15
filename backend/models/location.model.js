// src/models/location.model.js
const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    coordinates: {
        type: {
            type: String,
            enum: ['Point'], // 'Point' is the only type supported
            required: true,
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            required: true,
        },
    },
    description: String,
}, { timestamps: true });

module.exports = mongoose.model('Location', locationSchema);