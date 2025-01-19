const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    skills: {
        type: [String], // Array of strings for skills
        required: true,
    },
});

const aboutSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    contactLinks: {
        type: [String], // Array of strings for links
        required: true,
    },
    skills: {
        type: [skillSchema], // Array of skill categories
        required: true,
    },
    experience: {
        type: String,
        required: true,
    },
    education: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('About', aboutSchema); 