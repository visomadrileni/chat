const User = require('../models/User');
const {check} = require('express-validator');

module.exports.addContactValidator = () => [check('nickname').custom((contactUserNickname,{req}) => {
    const {nickname} = req.currentUser;
    if(contactUserNickname.toLowerCase() === nickname.toLowerCase()){
        return false;
    }
    return true
  }).withMessage("You can't add yourself").custom(contactUserNickname => new Promise( async (resolve,reject) => {
     try{
         const {contactOwnerId} = req.currentUser._id;
            User.findOne({nickname:nickname.toLowerCase()}, contactUser => {
            User.findOne({_id: contactOwnerId,contacts: { $elemMatch:{contactUserId:contactUser._id}}},result => {
                 if(result){
                     if(result.contacts.length > 0){
                         reject();
                     }
                 }

                 resolve();
             })})
         } catch(e){
             reject(e)
         }      
     })).withMessage("This Nickname is already added")
]
