const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true // Username must be unique
  },
  password: {
    type: String,
    required: true // Password is required
  },
  aboutMe: {
    type: String,
    default: '' // Default value for about me section
  },
  contact: {
    type: String,
    default: '' // Default value for contact information
  },
  skills: {
    type: [String],
    default: [] // Default value for skills array
  },
  experience: {
    type: String,
    default: '' // Default value for experience
  }
});

module.exports = mongoose.model('Admin', adminSchema); 