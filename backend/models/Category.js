const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: String, // Name of the category
  createdAt: { type: Date, default: Date.now } // Timestamp of when the category was created
});

module.exports = mongoose.model('Category', categorySchema); 