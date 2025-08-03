// src/controllers/faculty.controller.js

import Faculty from '../models/faculty.model.js';

// Get all faculty members
const getAllFacultyMembers = async (req, res) => {
  try {
    const facultyMembers = await Faculty.find();
    res.status(200).json(facultyMembers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get faculty by department name
const getFacultyByDepartment = async (req, res) => {
  try {
    const department = decodeURIComponent(req.params.department);
    const facultyList = await Faculty.find({ department });

    if (!facultyList.length) {
      return res.status(404).json({ message: 'No faculty found in this department.' });
    }

    res.status(200).json(facultyList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a specific faculty member by ID
const getFacultyMemberById = async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);
    if (!faculty) return res.status(404).json({ message: 'Faculty not found.' });
    res.status(200).json(faculty);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new faculty member
const createFacultyMember = async (req, res) => {
  try {
    const {
      name,
      department,
      email,
      phone,
      qualification,
      post,
      degree,
      experience,
      desc,
      imageUrl,
    } = req.body;

    if (
      !name || !department || !email || !phone || !qualification ||
      !post || !degree || !experience || !desc || !imageUrl
    ) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    const newFaculty = new Faculty({
      name,
      department,
      email,
      phone,
      qualification,
      post,
      degree,
      experience,
      desc,
      imageUrl,
    });

    const saved = await newFaculty.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a faculty member
const updateFacultyMember = async (req, res) => {
  try {
    const updated = await Faculty.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Faculty not found.' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a faculty member
const deleteFacultyMember = async (req, res) => {
  try {
    const deleted = await Faculty.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Faculty not found.' });
    res.status(200).json({ message: 'Faculty deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export {
  getAllFacultyMembers,
  getFacultyByDepartment,
  getFacultyMemberById,
  createFacultyMember,
  updateFacultyMember,
  deleteFacultyMember,
};
