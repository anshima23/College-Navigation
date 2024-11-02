const mongoose = require('mongoose');

const buildingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    shortDescription: { type: String, required: true }, // Short description for CampusMap
    detailedDescription: { type: String, required: true }, // Detailed description for BuildingDetail
    // other fields can go here...
});

const Building = mongoose.model('Building', buildingSchema);

module.exports = Building;
