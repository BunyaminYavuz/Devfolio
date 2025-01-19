const ActivityLog = require('../models/ActivityLog');

exports.getActivityLogs = async (req, res) => {
  try {
    const logs = await ActivityLog.find()
      .sort({ createdAt: -1 })
      .limit(50)
      .populate('adminId', 'username');
    
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createLog = async (adminId, action, resourceType, details, ipAddress) => {
  try {
    const log = new ActivityLog({
      adminId,
      action,
      resourceType,
      details,
      ipAddress
    });
    await log.save();
  } catch (error) {
    console.error('Error creating log:', error);
  }
}; 