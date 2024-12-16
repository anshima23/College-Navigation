// src/models/faculty.model.js
import mongoose from 'mongoose';

const facultySchema = new mongoose.Schema(
  {
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
    qualification: {
      type: String, // Qualification of the faculty (e.g., Ph.D., M.Tech, etc.)
      required: true, // Marking it as required
    },
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt` timestamps
);

const Faculty = mongoose.model('Faculty', facultySchema);
export default Faculty; // Export the Faculty model as default.
