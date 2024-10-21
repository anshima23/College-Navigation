// src/routes/faculty.routes.js
import express from 'express';
import Faculty from '../models/faculty.model.js'; // Ensure the model uses .js extension

const router = express.Router();

// Middleware to validate faculty data
const validateFacultyData = (req, res, next) => {
    const { name, department, email } = req.body;
    if (!name || !department || !email) {
        return res.status(400).json({ message: 'Invalid faculty data' });
    }
    next();
};

// Get all faculty members
router.get('/', async (req, res) => {
    try {
        const facultyMembers = await Faculty.find();
        res.json(facultyMembers);
    } catch (err) {
        console.error(err); // Log error for debugging
        res.status(500).json({ message: 'Server error' });
    }
});

// Get a specific faculty member by ID
router.get('/:id', async (req, res) => {
    try {
        const facultyMember = await Faculty.findById(req.params.id);
        if (!facultyMember) return res.status(404).json({ message: 'Faculty member not found' });
        res.json(facultyMember);
    } catch (err) {
        console.error(err); // Log error for debugging
        res.status(500).json({ message: 'Server error' });
    }
});

// Create a new faculty member
router.post('/', validateFacultyData, async (req, res) => {
    const facultyMember = new Faculty(req.body);
    try {
        const savedFacultyMember = await facultyMember.save();
        res.status(201).json(savedFacultyMember);
    } catch (err) {
        console.error(err); // Log error for debugging
        res.status(400).json({ message: 'Error creating faculty member' });
    }
});

// Update a faculty member
router.put('/:id', validateFacultyData, async (req, res) => {
    try {
        const updatedFacultyMember = await Faculty.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedFacultyMember) return res.status(404).json({ message: 'Faculty member not found' });
        res.json(updatedFacultyMember);
    } catch (err) {
        console.error(err); // Log error for debugging
        res.status(400).json({ message: 'Error updating faculty member' });
    }
});

// Delete a faculty member
router.delete('/:id', async (req, res) => {
    try {
        const deletedFacultyMember = await Faculty.findByIdAndDelete(req.params.id);
        if (!deletedFacultyMember) return res.status(404).json({ message: 'Faculty member not found' });
        res.json({ message: 'Faculty member deleted successfully' });
    } catch (err) {
        console.error(err); // Log error for debugging
        res.status(500).json({ message: 'Server error' });
    }
});

export default router; // Export the router as default
