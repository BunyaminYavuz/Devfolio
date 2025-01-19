const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const ActivityLog = require('../models/ActivityLog');
const About = require('../models/About');

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the admin
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Check the password
    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({
      username,
      password: hashedPassword
    });

    await admin.save();
    res.status(201).json({ message: 'Admin created' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const admin = await Admin.findById(req.admin.id);

    // Check the current password
    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    admin.password = hashedPassword;
    await admin.save();

    // Create activity log
    await ActivityLog.create({
      adminId: admin._id,
      action: 'UPDATE',
      resourceType: 'ADMIN',
      details: { message: 'Password updated' },
      ipAddress: req.ip
    });

    res.json({ message: 'Password successfully updated' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { username } = req.body;
    const admin = await Admin.findById(req.admin.id);

    if (username) admin.username = username;
    await admin.save();

    // Create activity log
    await ActivityLog.create({
      adminId: admin._id,
      action: 'UPDATE',
      resourceType: 'ADMIN',
      details: { message: 'Profile updated' },
      ipAddress: req.ip
    });

    res.json({ message: 'Profile successfully updated', admin });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

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

exports.getAboutMe = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id);
    res.json({ aboutMe: admin.aboutMe });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateAboutMe = async (req, res) => {
  try {
    const { aboutMe, contact, skills, experience } = req.body;
    const admin = await Admin.findById(req.admin.id);

    // Update about me, contact, skills, and experience information
    admin.aboutMe = aboutMe;
    admin.contact = contact;
    admin.skills = skills;
    admin.experience = experience;

    await admin.save();

    res.json({ message: 'About me information successfully updated', admin });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAbout = async (req, res) => {
    try {
        const about = await About.findOne();
        res.json(about);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching about information' });
    }
};

exports.updateAbout = async (req, res) => {
    console.log('Received update request:', req.body);
    try {
        const { title, description, contactLinks, skills, experience, education } = req.body;
        await About.findOneAndUpdate({}, { title, description, contactLinks, skills, experience, education }, { new: true, upsert: true });
        res.json({ message: 'About information updated successfully' });
    } catch (error) {
        console.error('Error updating about information:', error);
        res.status(500).json({ message: 'Error updating about information' });
    }
}; 