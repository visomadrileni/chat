const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    message:{
        type: String,
        require: true,
        default:'',
        trim:true
       },
    dateTime: {
        type: Date,
        required: true,
        default: Date.now
       },
    senderId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
       },
    receiverId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }         
});

module.exports = mongoose.model('Message',MessageSchema);