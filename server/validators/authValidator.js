const User = require('../models/User');
const {check} = require('express-validator');

module.exports.signupValidator = () => [check('nickname').isLength({min:6,max:13})
  .withMessage("Nickname must be between 6 and 13 characters").custom(nickname => new Promise(async (resolve,reject) => {
    try{
        await User.findOne({nickname:nickname.toLowerCase()},user => {
            if(user.length > 0){
                reject();
            }
            resolve();
        })
      }catch(e){
         reject()
    }
   })).withMessage('This nickname already exists on our database'),
   check('password').isLength({min:8,max:15}).withMessage('Password must be between 8 and 15 charcters')
]