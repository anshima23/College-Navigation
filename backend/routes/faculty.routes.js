import express from 'express';
import Faculty from '../models/faculty.model.js';

const router = express.Router();

// POST: Add a new faculty member
// POST: Add a new faculty member
router.post('/', async (req, res) => {
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

    // Validate all required fields
    if (!name || !department || !email || !phone || !qualification || !post || !degree || !experience || !desc || !imageUrl) {
      return res.status(400).json({
        message: 'Missing required fields. Please ensure all fields are filled.',
      });
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

    await newFaculty.save();
    res.status(201).json({ message: 'Faculty added successfully', faculty: newFaculty });
  } catch (error) {
    console.error('Error creating faculty:', error.message);
    res.status(500).json({ message: 'Server error while creating faculty.' });
  }
});


// GET: Fetch all faculty
router.get('/', async (req, res) => {
  try {
    const facultyList = await Faculty.find();
    res.status(200).json(facultyList);
  } catch (error) {
    console.error('Error fetching faculty:', error.message);
    res.status(500).json({ message: 'Server error while fetching faculty.' });
  }
});

// GET: Fetch faculty by department
router.get('/department/:deptName', async (req, res) => {
  try {
    const deptName = req.params.deptName;
    const facultyInDept = await Faculty.find({ department: deptName });

    if (facultyInDept.length === 0) {
      return res.status(404).json({ message: 'No faculty found in this department.' });
    }

    res.status(200).json(facultyInDept);
  } catch (error) {
    console.error('Error fetching department faculty:', error.message);
    res.status(500).json({ message: 'Server error while fetching department faculty.' });
  }
});

export default router;
