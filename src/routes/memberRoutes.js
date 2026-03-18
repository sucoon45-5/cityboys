const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');
const { authMiddleware } = require('../middleware/auth');

// @route   POST api/members/register
// @desc    Register a new member
// @access  Public
router.post('/register', memberController.registerMember);

// @route   GET api/members/profile
// @desc    Get current member profile
// @access  Private
router.get('/profile', authMiddleware, memberController.getMemberProfile);

module.exports = router;
