const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// POST route to create a new message
router.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const newMessage = new Message({ name, email, message });
        await newMessage.save();
        res.status(201).json({ message: 'Message sent successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error sending message', error });
    }
});

// GET route to fetch all messages (for admin panel)
router.get('/messages', async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching messages', error });
    }
});

// DELETE route to delete a message
router.delete('/messages/:id', async (req, res) => {
    try {
        await Message.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Message deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting message', error });
    }
});

module.exports = router; 