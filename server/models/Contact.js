const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    contactUserId: {
        type: Schema.Types.ObjectId,
        required:true,
        ref: 'User'
    }
});

module.exports = mongoose.model('Contact',ContactSchema);