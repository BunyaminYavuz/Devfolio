const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true // Name is required
  },
  email: {
    type: String,
    required: true // Email is required
  },
  message: {
    type: String,
    required: true // Message is required
  },
  createdAt: {
    type: Date,
    default: Date.now // Timestamp of when the contact message was created
  }
});

module.exports = mongoose.model('Contact', contactSchema); 