const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
    unreadMessages: {
        type: Number,
        default:0
    },
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    partnerId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Message'
    }]
});

module.exports = mongoose.model('Conversation',ConversationSchema);