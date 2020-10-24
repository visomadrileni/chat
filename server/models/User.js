const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    nickname:{ 
        type: String,
        required: true,
        default: '',
        unique:true,
        trim: true,
        lowercase: true
       },
    password: {
        type: String,
        required: true,
        trim: true,
        default: ''
       },
    profileColor:{
        type:String,
        required: true,
        default:'',
        trim: true
    },
    contacts: [{
        type: Schema.Types.ObjectId,
        ref: 'Contact'
    }]     
});

module.exports = mongoose.model('User',UserSchema);