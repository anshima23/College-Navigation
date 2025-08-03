// src/controllers/faculty.controller.js

import Faculty from '../models/faculty.model.js';


// Get all faculty members
const getAllFacultyMembers = async (req, res) => {
    try {
        const facultyMembers = await Faculty.find();
        res.json(facultyMembers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a specific faculty member by ID
const getFacultyMemberById = async (req, res) => {
    try {
        const facultyMember = await Faculty.findById(req.params.id);
        if (!facultyMember) return res.status(404).json({ message: 'Faculty member not found' });
        res.json(facultyMember);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new faculty member
const createFacultyMember = async (req, res) => {
    const facultyMember = new Faculty(req.body);
    try {
        const savedFacultyMember = await facultyMember.save();
        res.status(201).json(savedFacultyMember);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update a faculty member
const updateFacultyMember = async (req, res) => {
    try {
        const updatedFacultyMember = await Faculty.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedFacultyMember) return res.status(404).json({ message: 'Faculty member not found' });
        res.json(updatedFacultyMember);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a faculty member
const deleteFacultyMember = async (req, res) => {
    try {
        const deletedFacultyMember = await Faculty.findByIdAndDelete(req.params.id);
        if (!deletedFacultyMember) return res.status(404).json({ message: 'Faculty member not found' });
        res.json({ message: 'Faculty member deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export {
  getAllFacultyMembers,
  getFacultyMemberById,
  createFacultyMember,
  updateFacultyMember,
  deleteFacultyMember,
};