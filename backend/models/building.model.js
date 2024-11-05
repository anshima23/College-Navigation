// src/models/building.model.js
import mongoose from 'mongoose';

const buildingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    shortDescription: { type: String, required: true },
    detailedDescription: { type: String, required: true },
});

const Building = mongoose.model('Building', buildingSchema);

export default Building;
