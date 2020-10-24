const route = require('express').Router();
const _ = require('lodash');
const Message = require('../models/Message');
const Conversation = require('../models/Conversation');

route.get('/secured/conversation', async (req,res) => {
    try{
        const {_id:ownerId} = req.currentUser;
        const result = await Conversation.find(ownerId).populate({
            path: 'messages',
            options: {
                      sort: {dateTime: -1}
                     },
            limit:1         
           })
           .populate('ownerId',{password:0,contacts})
           .populate('partnerId',{password:0,contacts:0})

       res.status(200).json({
           success: true,
           result
       })    
    }catch(e){
        res.status(500).json({success: false})
    }
})

route.put('/secured/conversation', async (req,res) => {
    const {partnerId,conversation} = req.body;
    const {_id:ownerId} = req.currentUser;

    try{
         await Conversation.findOneAndUpdate({ownerId,partnerId},conversation,{new:true});
         res.status(200).json({success:true})
      }catch(e){
          res.status(500).json({success: false})
      }
})

route.delete('/secured/conversation', async (req,res) => {
    const {partnerId} = req.body;
    const {_id:ownerId} = req.currentUser;

    try{
        const ownerConversation  = await Conversation.findOneAndDelete({partnerId,ownerId});
        const partnerConversation = await Conversation.find({partnerId: ownerId,ownerId: partnerId}).populate({
            path: 'messages',
            options: {
                      sort: {dateTime: -1}
                     },
            limit:1         
           })
           .populate('ownerId',{password:0,contacts})
           .populate('partnerId',{password:0,contacts:0})

        const ownerMessages = ownerConversation ? ownerConversation.messages.map(item => String(item._id)) : [];
        const partnerMessages = partnerConversation ? partnerConversation.messages.map(item => String(item._id)) : [];

        await Message.deleteMany({
            _id: {
                $in: _.difference(ownerMessages,partnerMessages)
            }
        })

        res.status(200).json({success:true})
    }catch(err){
        console.log(err);
        res.status(500).json({success:false})
    }
})

module.exports = route;