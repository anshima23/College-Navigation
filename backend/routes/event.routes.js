import express from 'express';
import Event from '../models/event.model.js';

const router = express.Router();

// Middleware to validate event data
const validateEventData = (req, res, next) => {
    const { title, dateTime, location } = req.body;
    if (!title || !dateTime || !location) {
        return res.status(400).json({ message: 'Invalid event data' });
    }
    next();
};

// Helper function to get the start and end of a week
const getStartAndEndOfWeek = (date) => {
    const startOfWeek = new Date(date);
    const endOfWeek = new Date(date);
    const dayOfWeek = startOfWeek.getDay();
    startOfWeek.setDate(startOfWeek.getDate() - dayOfWeek); // Sunday
    endOfWeek.setDate(endOfWeek.getDate() + (6 - dayOfWeek)); // Saturday
    startOfWeek.setHours(0, 0, 0, 0);
    endOfWeek.setHours(23, 59, 59, 999);
    return { startOfWeek, endOfWeek };
};

// Helper function to get the start and end of a month
const getStartAndEndOfMonth = (date) => {
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    startOfMonth.setHours(0, 0, 0, 0);
    endOfMonth.setHours(23, 59, 59, 999);
    return { startOfMonth, endOfMonth };
};

// Get all events
router.get('/', async (req, res) => {
    try {
        const events = await Event.find().sort({ dateTime: 1 });
        res.json(events);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get events by selected date (Day View)
router.get('/date/:selectedDate', async (req, res) => {
    try {
        const { selectedDate } = req.params;
        console.log('🔍 Requested date:', selectedDate);

        const startOfDay = new Date(selectedDate);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(selectedDate);
        endOfDay.setHours(23, 59, 59, 999);

        const events = await Event.find({
            dateTime: { $gte: startOfDay, $lt: endOfDay },
        }).sort({ dateTime: 1 });

        console.log('✅ Events found:', events.length);
        res.json(events);
    } catch (err) {
        console.error('❌ Error fetching day events:', err);
        res.status(500).json({ message: 'Error fetching events' });
    }
});


// Get events by selected week (Week View)
router.get('/week/:selectedDate', async (req, res) => {
    try {
        const { selectedDate } = req.params;
        const selectedDay = new Date(selectedDate);

        const { startOfWeek, endOfWeek } = getStartAndEndOfWeek(selectedDay);

        const events = await Event.find({
            dateTime: { $gte: startOfWeek, $lt: endOfWeek },
        }).sort({ dateTime: 1 });

        res.json(events);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching events' });
    }
});

// Get events by selected month (Month View)
router.get('/month/:selectedDate', async (req, res) => {
    try {
        const { selectedDate } = req.params;
        const selectedDay = new Date(selectedDate);

        const { startOfMonth, endOfMonth } = getStartAndEndOfMonth(selectedDay);

        const events = await Event.find({
            dateTime: { $gte: startOfMonth, $lt: endOfMonth },
        }).sort({ dateTime: 1 });

        res.json(events);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching events' });
    }
});

// Get a specific event by ID
router.get('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.json(event);
    } catch (err) {
        console.error(err);
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
        console.error(err);
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
        console.error(err);
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
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
