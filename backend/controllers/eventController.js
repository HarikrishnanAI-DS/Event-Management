const Event = require("../models/Event");

// Get all events
exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find().sort({ createdAt: -1 });
        res.json(events);
    } catch (error) {
        console.error('Error in getAllEvents:', error);
        res.status(500).json({ message: error.message });
    }
};

// Get event by ID
exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (event) {
            res.json(event);
        } else {
            res.status(404).json({ message: "Event not found" });
        }
    } catch (error) {
        console.error('Error in getEventById:', error);
        res.status(500).json({ message: error.message });
    }
};

// Get events by category
exports.getEventsByCategory = async (req, res) => {
    try {
        const events = await Event.find({ category: req.params.category }).sort({ createdAt: -1 });
        res.json(events);
    } catch (error) {
        console.error('Error in getEventsByCategory:', error);
        res.status(500).json({ message: error.message });
    }
};

// Create new event
exports.createEvent = async (req, res) => {
    const event = new Event(req.body);
    try {
        const newEvent = await event.save();
        res.status(201).json(newEvent);
    } catch (error) {
        console.error('Error in createEvent:', error);
        res.status(400).json({ message: error.message });
    }
};

// Update event
exports.updateEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (event) {
            res.json(event);
        } else {
            res.status(404).json({ message: "Event not found" });
        }
    } catch (error) {
        console.error('Error in updateEvent:', error);
        res.status(400).json({ message: error.message });
    }
};

// Delete event
exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (event) {
            res.json({ message: "Event deleted successfully" });
        } else {
            res.status(404).json({ message: "Event not found" });
        }
    } catch (error) {
        console.error('Error in deleteEvent:', error);
        res.status(500).json({ message: error.message });
    }
};

// Book event
exports.bookEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        const { numberOfTickets } = req.body;
        if (numberOfTickets > event.availableSeats) {
            return res.status(400).json({ message: "Not enough seats available" });
        }

        event.availableSeats -= numberOfTickets;
        await event.save();

        res.json({ 
            message: "Booking successful",
            event: event
        });
    } catch (error) {
        console.error('Error in bookEvent:', error);
        res.status(500).json({ message: error.message });
    }
};
