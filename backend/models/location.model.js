import mongoose from 'mongoose';

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
    connections: [{
        name: {
            type: String, 
            required: true
        },
        distance: {
            type: Number, // Distance in meters or kilometers
            required: true
        }
    }]
}, { timestamps: true });

const Location = mongoose.model('Location', locationSchema);
export default Location;
