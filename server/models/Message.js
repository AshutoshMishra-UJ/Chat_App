const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    conversation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation',
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true,
        trim: true,
        maxlength: 1000
    },
    messageType: {
        type: String,
        enum: ['text', 'image', 'file'],
        default: 'text'
    },
    status: {
        type: String,
        enum: ['sent', 'delivered', 'read'],
        default: 'sent'
    },
    readAt: {
        type: Date
    }
}, {
    timestamps: true
});

// Update conversation's lastMessage and lastActivity when message is saved
messageSchema.post('save', async function () {
    try {
        await mongoose.model('Conversation').findByIdAndUpdate(
            this.conversation,
            {
                lastMessage: this._id,
                lastActivity: this.createdAt
            }
        );
    } catch (error) {
        console.error('Error updating conversation:', error);
    }
});

module.exports = mongoose.model('Message', messageSchema);
