// src/routes/event.routes.js

import express from 'express'; // Change to import statement
import Event from '../models/event.model.js'; // Ensure the model uses .js extension

const router = express.Router();

// Middleware to validate event data
const validateEventData = (req, res, next) => {
    const { title, dateTime, location } = req.body;
    if (!title || !dateTime || !location) {
        return res.status(400).json({ message: 'Invalid event data' });
    }
    next();
};

// Get all events
router.get('/', async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (err) {
        console.error(err); // Log error for debugging
        res.status(500).json({ message: 'Server error' });
    }
});

// Get a specific event by ID
router.get('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.json(event);
    } catch (err) {
        console.error(err); // Log error for debugging
        res.status(500).json({ message: 'Server error' });
    }
});

// Create a new event
router.post('/', validateEventData, async (req, res) => {
    const event = new Event(req.body);
    try {
        const savedEvent = await event.save();
        res.status(201).json(savedEvent);
    } catch (err) {
        console.error(err); // Log error for debugging
        res.status(400).json({ message: 'Error creating event' });
    }
});

// Update an event
router.put('/:id', validateEventData, async (req, res) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEvent) return res.status(404).json({ message: 'Event not found' });
        res.json(updatedEvent);
    } catch (err) {
        console.error(err); // Log error for debugging
        res.status(400).json({ message: 'Error updating event' });
    }
});

// Delete an event
router.delete('/:id', async (req, res) => {
    try {
        const deletedEvent = await Event.findByIdAndDelete(req.params.id);
        if (!deletedEvent) return res.status(404).json({ message: 'Event not found' });
        res.json({ message: 'Event deleted successfully' });
    } catch (err) {
        console.error(err); // Log error for debugging
        res.status(500).json({ message: 'Server error' });
    }
});


// Export the router as default
export default router;
