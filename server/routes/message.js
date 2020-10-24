const route = require('express').Router();
const moment = require('moment');
const Message = require('../models/Message');
const Conversation = require('../models/Conversation');

route.post('/message', async (req,res) => {
    const {message,receiverId} = req.body;
    const {_id:senderId} = req.currentUser;
    const model = {
           senderId,
           receiverId,
           message,
           dateTime: moment.utc().toDate()
         };

     try{
        const messageResult =  await new Message(model);
        await Conversation.findOneAndUpdate({ ownerId:senderId,partnerId: receiverId},
                                            { ownerId:senderId, partnerId:receiverId, $set:{messages: messageResult._id}},
                                            { new:true,upsert:true});
        await Conversation.findOneAndUpdate({ownerId:receiverId,partnerId: senderId},
                                            {ownerId:receiverId,partnerId:senderId,$inc:{unreadMessages:1},$set:{messages: messageResult._id}},
                                            { new:true,upsert:true});

        io.to(receiverId).emit('message.now',{
               message: messageResult,
               sender: req.currentUser
         })

      res.status(200).json({
          success: true,
          result: messageResult
      })
     } catch(err){
       res.status(500).json({success:false})
     }
});

route.get('/message', async (req,res) => {
    const {partnerId} = req.query;
    const {_id:ownerId} = req.currentUser;
    
    try{
        const result = await Conversation.find({partnerId,ownerId}).populate({
            path: 'messages',
            options: {sort: {dateTime: -1}},
            limit:1         
           }).populate('ownerId').populate('partnerId')

        const allMessages = result.messages.map(msg => {
            const {message,_id,senderId,dateTime} = msg;

            return {
                   _id,
                   message,
                   dateTime,
                   currentUserIsSender: String(senderId) === String(ownerId)
            }
        });
        
        res.json(200).json({
               success: true,
               result: result ? allMessages : []
        })
    }catch(err){
         res.status(500).json({success:false})
    }
});

route.delete('/message/delete-message', async (req,res) => {
    const {messageId,partnerId} = req.body;
    const {_id:ownerId} = req.currentUser;

    try{
       await Conversation.findOneAndUpdate({partnerId,ownerId},{$pull: {messages: messageId}});
       const partnerConverstion = await Conversation.find({partnerId:ownerId,ownerId:partnerId}).populate({
        path: 'messages',
        options: {sort: {dateTime: -1}},
        limit:1         
       }).populate('ownerId').populate('partnerId')

       if(partnerConverstion){
           const message = partnerConverstion.messages.find(msg => String(msg._id) === String(messageId))
           if(message){
               await Message.findByIdAndRemove(messageId)
           }
       }

        res.status(200).json({success:true})
    } catch(err){
        res.status(500).json({success:false})
    }
})

module.exports = route;