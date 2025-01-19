const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  },
  action: {
    type: String,
    required: true,
    enum: ['CREATE', 'UPDATE', 'DELETE', 'LOGIN'] // Possible actions
  },
  resourceType: {
    type: String,
    required: true,
    enum: ['PROJECT', 'CATEGORY', 'ADMIN'] // Types of resources
  },
  details: {
    type: Object // Additional details about the action
  },
  ipAddress: String, // IP address of the admin
  createdAt: {
    type: Date,
    default: Date.now // Timestamp of when the log was created
  }
});

module.exports = mongoose.model('ActivityLog', activityLogSchema); 