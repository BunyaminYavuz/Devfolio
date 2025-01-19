const Project = require('../models/Project');
const Category = require('../models/Category');
const Admin = require('../models/Admin');
const Message = require('../models/Message');

exports.getDashboardStats = async (req, res) => {
  try {
    const totalMessages = await Message.countDocuments();
    const totalProjects = await Project.countDocuments();
    const totalCategories = await Category.countDocuments();

    const stats = {
      totalMessages,
      totalProjects,
      totalCategories,
      recentProjects: await Project.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select('title category createdAt'),
      projectsByCategory: await Project.aggregate([
        {
          $group: {
            _id: '$category',
            count: { $sum: 1 }
          }
        }
      ])
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 