const route = require('express').Router();
const User = require('../models/User');
const _ = require('lodash');
const {validationResult} = require('express-validator');
const {addContactValidator} = require('../validators/contactValidator');

route.post('/secured/contact',addContactValidator(), async (req,res) => {
    const {nickname:contactUserNickname} = req.body;
    const {_id: contactOwnerId} = req.currentUser;

    const errors = validationResult(req);
    if(!_.isEmpty(errors)){
        res.status(400).json({
            success: false,
            errors: errors.array()
        })
    } else{
        try{
            await User.findOne({nickname:contactUserNickname}, contactUser => {
                if(contactUser){
                     User.findByIdAndUpdate({_id:contactOwnerId},{$set:{contacts:{contactUserId:contactUser._id}}},{new:true})
                }
            })

            res.status(200).json({
                success: true,
                errors: {}
            })
        }catch(e){
            console.log(e);
            res.status(500).json({
                success: false,
                errors: {}
            })
        }
    }
})

route.get('/secured/contact', async (req,res) => {
    try{
        const {_id} = req.currentUser;
        await User.findOne(_id,result => {
            if(result){
                const users = User.find({_id: result.contacts.map(item => item.contactUserId)});
                return users;
            }
        })

        res.status(200).json({
            success:true,
            result: users
        })
    } catch(e){
        res.status(500).json({
            success: false,
            errors: {}
        })
    }
})

route.delete('/secured/contact', async (req,res) => {
    const {contactId} = req.body;
    const {_id} = req.currentUser;

    try{
        await User.findByIdAndDelete(_id,{$pull:{contacts:{contactUserId:contactId}}})
        res.status(200).json({success:true})
    }catch(e){
        res.status(500).json({
            success: false,
            errors: {}
        })
    }
})

module.exports = route;
