const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');

router.post('/login', adminController.login);
router.get('/about', adminController.getAbout);
router.put('/about', adminController.updateAbout);
router.post('/change-password', auth, adminController.changePassword);
router.put('/profile', auth, adminController.updateProfile);
router.get('/activity-logs', auth, adminController.getActivityLogs);

module.exports = router; 