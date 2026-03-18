const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// Apply auth and admin middleware to all routes
router.use(authMiddleware);
router.use(adminMiddleware);

// Members
router.get('/members', adminController.getAllMembers);
router.put('/members/:id/status', adminController.approveMember);

// News
router.post('/news', adminController.createNews);

// Events
router.post('/events', adminController.createEvent);

// Stats
router.get('/stats', adminController.getStats);

module.exports = router;
