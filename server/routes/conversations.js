const express = require('express');
const Message = require('../models/Message');
const Conversation = require('../models/Conversation');
const auth = require('../middleware/auth');

const router = express.Router();

// Get messages for a conversation
router.get('/:conversationId/messages', auth, async (req, res) => {
    try {
        const { conversationId } = req.params;
        const { page = 1, limit = 50 } = req.query;

        // Verify user is part of the conversation
        const conversation = await Conversation.findById(conversationId);
        if (!conversation) {
            return res.status(404).json({ error: 'Conversation not found' });
        }

        if (!conversation.participants.includes(req.user._id)) {
            return res.status(403).json({ error: 'Access denied to this conversation' });
        }

        // Get messages with pagination
        const messages = await Message.find({ conversation: conversationId })
            .populate('sender', 'username avatar')
            .populate('receiver', 'username avatar')
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        // Reverse to show oldest first
        messages.reverse();

        res.json({ messages });
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Server error fetching messages' });
    }
});

// Get user's conversations
router.get('/', auth, async (req, res) => {
    try {
        const conversations = await Conversation.find({
            participants: req.user._id
        })
            .populate('participants', 'username avatar isOnline lastSeen')
            .populate({
                path: 'lastMessage',
                populate: {
                    path: 'sender',
                    select: 'username'
                }
            })
            .sort({ lastActivity: -1 });

        res.json({ conversations });
    } catch (error) {
        console.error('Error fetching conversations:', error);
        res.status(500).json({ error: 'Server error fetching conversations' });
    }
});

// Mark messages as read
router.put('/:conversationId/read', auth, async (req, res) => {
    try {
        const { conversationId } = req.params;

        // Verify user is part of the conversation
        const conversation = await Conversation.findById(conversationId);
        if (!conversation) {
            return res.status(404).json({ error: 'Conversation not found' });
        }

        if (!conversation.participants.includes(req.user._id)) {
            return res.status(403).json({ error: 'Access denied to this conversation' });
        }

        // Mark all unread messages as read
        await Message.updateMany({
            conversation: conversationId,
            receiver: req.user._id,
            status: { $ne: 'read' }
        }, {
            status: 'read',
            readAt: new Date()
        });

        res.json({ message: 'Messages marked as read' });
    } catch (error) {
        console.error('Error marking messages as read:', error);
        res.status(500).json({ error: 'Server error marking messages as read' });
    }
});

module.exports = router;
