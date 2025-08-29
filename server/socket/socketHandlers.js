const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Message = require('../models/Message');
const Conversation = require('../models/Conversation');

// Store connected users
const connectedUsers = new Map();

const socketAuth = async (socket, next) => {
    try {
        const token = socket.handshake.auth.token;
        if (!token) {
            return next(new Error('Authentication error'));
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return next(new Error('User not found'));
        }

        socket.userId = user._id.toString();
        socket.user = user;
        next();
    } catch (error) {
        next(new Error('Authentication error'));
    }
};

const handleConnection = (io) => {
    return async (socket) => {
        console.log(`User ${socket.user.username} connected`);

        // Add user to connected users
        connectedUsers.set(socket.userId, socket.id);

        // Update user online status
        await User.findByIdAndUpdate(socket.userId, {
            isOnline: true,
            lastSeen: new Date()
        });

        // Join user to their own room for private messaging
        socket.join(socket.userId);

        // Broadcast user online status to all users
        socket.broadcast.emit('user:online', {
            userId: socket.userId,
            username: socket.user.username
        });

        // Handle sending messages
        socket.on('message:send', async (data) => {
            try {
                const { conversationId, receiverId, content } = data;

                // Verify conversation exists and user is participant
                const conversation = await Conversation.findById(conversationId);
                if (!conversation || !conversation.participants.includes(socket.userId)) {
                    socket.emit('error', { message: 'Invalid conversation' });
                    return;
                }

                // Create message
                const message = new Message({
                    conversation: conversationId,
                    sender: socket.userId,
                    receiver: receiverId,
                    content: content.trim()
                });

                await message.save();
                await message.populate('sender', 'username avatar');
                await message.populate('receiver', 'username avatar');

                // Send to sender
                socket.emit('message:new', message);

                // Send to receiver if online
                const receiverSocketId = connectedUsers.get(receiverId);
                if (receiverSocketId) {
                    io.to(receiverSocketId).emit('message:new', message);

                    // Mark as delivered
                    message.status = 'delivered';
                    await message.save();

                    // Notify sender about delivery
                    socket.emit('message:delivered', { messageId: message._id });
                }

            } catch (error) {
                console.error('Error sending message:', error);
                socket.emit('error', { message: 'Failed to send message' });
            }
        });

        // Handle typing indicators
        socket.on('typing:start', (data) => {
            const { conversationId, receiverId } = data;
            const receiverSocketId = connectedUsers.get(receiverId);

            if (receiverSocketId) {
                io.to(receiverSocketId).emit('typing:start', {
                    conversationId,
                    userId: socket.userId,
                    username: socket.user.username
                });
            }
        });

        socket.on('typing:stop', (data) => {
            const { conversationId, receiverId } = data;
            const receiverSocketId = connectedUsers.get(receiverId);

            if (receiverSocketId) {
                io.to(receiverSocketId).emit('typing:stop', {
                    conversationId,
                    userId: socket.userId
                });
            }
        });

        // Handle message read receipts
        socket.on('message:read', async (data) => {
            try {
                const { messageId, senderId } = data;

                // Update message status
                await Message.findByIdAndUpdate(messageId, {
                    status: 'read',
                    readAt: new Date()
                });

                // Notify sender if online
                const senderSocketId = connectedUsers.get(senderId);
                if (senderSocketId) {
                    io.to(senderSocketId).emit('message:read', {
                        messageId,
                        readBy: socket.userId
                    });
                }

            } catch (error) {
                console.error('Error marking message as read:', error);
            }
        });

        // Handle disconnection
        socket.on('disconnect', async () => {
            console.log(`User ${socket.user.username} disconnected`);

            // Remove from connected users
            connectedUsers.delete(socket.userId);

            // Update user offline status
            await User.findByIdAndUpdate(socket.userId, {
                isOnline: false,
                lastSeen: new Date()
            });

            // Broadcast user offline status
            socket.broadcast.emit('user:offline', {
                userId: socket.userId,
                username: socket.user.username
            });
        });
    };
};

module.exports = {
    socketAuth,
    handleConnection,
    connectedUsers
};
