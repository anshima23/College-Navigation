// src/routes/faculty.routes.js

const express = require('express');
const Faculty = require('../models/faculty.model');

const router = express.Router();

// Get all faculty members
router.get('/', async (req, res) => {
    try {
        const facultyMembers = await Faculty.find();
        res.json(facultyMembers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a specific faculty member by ID
router.get('/:id', async (req, res) => {
    try {
        const facultyMember = await Faculty.findById(req.params.id);
        if (!facultyMember) return res.status(404).json({ message: 'Faculty member not found' });
        res.json(facultyMember);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new faculty member
router.post('/', async (req, res) => {
    const facultyMember = new Faculty(req.body);
    try {
        const savedFacultyMember = await facultyMember.save();
        res.status(201).json(savedFacultyMember);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a faculty member
router.put('/:id', async (req, res) => {
    try {
        const updatedFacultyMember = await Faculty.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedFacultyMember) return res.status(404).json({ message: 'Faculty member not found' });
        res.json(updatedFacultyMember);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a faculty member
router.delete('/:id', async (req, res) => {
    try {
        const deletedFacultyMember = await Faculty.findByIdAndDelete(req.params.id);
        if (!deletedFacultyMember) return res.status(404).json({ message: 'Faculty member not found' });
        res.json({ message: 'Faculty member deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;