import express from 'express';
import Faculty from '../models/faculty.model.js';

const router = express.Router();

// Utility function to validate required fields
const validateFacultyData = (data) => {
  const requiredFields = [
    'name',
    'department',
    'email',
    'phone',
    'qualification',
    'post',
    'degree',
    'experience',
    'desc',
    'imageUrl',
  ];

  for (const field of requiredFields) {
    if (!data[field] || data[field].toString().trim() === '') {
      return `Missing or empty required field: ${field}`;
    }
  }

  return null;
};

// ✅ POST - Create new faculty
router.post('/faculty', async (req, res) => {
  try {
    const validationError = validateFacultyData(req.body);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const newFaculty = new Faculty(req.body);
    await newFaculty.save();

    res.status(201).json({
      message: 'Faculty created successfully',
      faculty: newFaculty,
    });
  } catch (error) {
    console.error('POST /faculty error:', error.message);
    res.status(500).json({ message: 'Server error while creating faculty' });
  }
});

// ✅ PUT - Update faculty by ID
router.put('/faculty/:id', async (req, res) => {
  try {
    const facultyId = req.params.id;
    const updates = req.body;

    const validationError = validateFacultyData(updates);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const updatedFaculty = await Faculty.findByIdAndUpdate(facultyId, updates, { new: true });

    if (!updatedFaculty) {
      return res.status(404).json({ message: 'Faculty not found' });
    }

    res.status(200).json({
      message: 'Faculty updated successfully',
      faculty: updatedFaculty,
    });
  } catch (error) {
    console.error('PUT /faculty/:id error:', error.message);
    res.status(500).json({ message: 'Server error while updating faculty' });
  }
});

export default router;
