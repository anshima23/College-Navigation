// src/models/faculty.model.js
import mongoose from 'mongoose';

const facultySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
    },
}, { timestamps: true });

const Faculty = mongoose.model('Faculty', facultySchema);
export default Faculty; // Export the Faculty model as default
