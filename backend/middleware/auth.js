const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Authorization required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check for admin existence
    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      throw new Error();
    }
    
    // Add session check
    if (admin.tokenExpiration && new Date() > admin.tokenExpiration) {
      throw new Error('Session has expired');
    }

    req.admin = admin;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token or session has expired' });
  }
};

module.exports = auth; 