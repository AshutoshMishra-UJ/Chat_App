const express = require('express');
const User = require('../models/User');
const Conversation = require('../models/Conversation');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all users (excluding current user)
router.get('/', auth, async (req, res) => {
    try {
        const users = await User.find({
            _id: { $ne: req.user._id }
        })
            .select('-password')
            .sort({ isOnline: -1, lastSeen: -1 });

        res.json({ users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Server error fetching users' });
    }
});

// Get user by ID
router.get('/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ user });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Server error fetching user' });
    }
});

// Get or create conversation with a user
router.post('/conversation/:userId', auth, async (req, res) => {
    try {
        const { userId } = req.params;
        const currentUserId = req.user._id;

        // Check if target user exists
        const targetUser = await User.findById(userId);
        if (!targetUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if conversation already exists
        let conversation = await Conversation.findOne({
            participants: { $all: [currentUserId, userId] }
        }).populate('participants', '-password')
            .populate('lastMessage');

        // If no conversation exists, create one
        if (!conversation) {
            conversation = new Conversation({
                participants: [currentUserId, userId]
            });
            await conversation.save();
            await conversation.populate('participants', '-password');
        }

        res.json({ conversation });
    } catch (error) {
        console.error('Error getting/creating conversation:', error);
        res.status(500).json({ error: 'Server error managing conversation' });
    }
});

module.exports = router;
