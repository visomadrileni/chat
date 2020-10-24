const route = require('express').Router();
const _ = require('lodash');
const {validationResult} = require('express-validator');
const {signupValidator} = require('../validators/authValidator');
const User = require('../models/User');
const randomColor = require('../utils/randomColors');
const {encryptPassword,createJwtToken} = require('../utils/helperMethods');


route.post('/auth/signup',signupValidator(), async (req,res) => {
    const {nickname,password} = req.body;

    const errors = validationResult(req);
    if(!_.isEmpty(errors)){
        res.status(400).json({
            success: false,
            errors: errors.array()
        })
    } else {
      try{  
            const user = new User({nickname,password,profileColor: randomColor() });
            user.save();

            const token = createJwtToken({
                nickname: user.nickname.toLowerCase(),
                _id: user._id
            });

            res.status(200).json({
                  success:true,
                  errors: {},
                  token,
                  user
            })
        }catch(e){
         console.log(e);
         res.status(500).json({
             success: false,
             errors: {}
         })
    }}
});

route.post('/auth/signin',async (req,res) => {
    const {nickname,password} = req.body;
    try{
        await User.findOne({password:encryptPassword(password),nickname:nickname.toLowerCase()}, user => {
            if(user){
                const token = createJwtToken({
                    nickname: user.nickname.toLowerCase(),
                    _id: user._id
                })

                res.status(200).json({
                    success: true,
                    user,
                    token,
                    errors: {}
                })
            }
        })
    } catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            errors: {}
        })  
    }
})

route.get('/auth/verify-nickname',async (req,res) => {
    const {nickname} = req.query;
    try{
        await User.findOne({nickname:nickname.toLowerCase()}, user => {
            const errors = {};
            if(user && user.length > 0){
                 errors.nickname = "This nickname is already taken";
            }

            res.status(200).json({
                success: true,
                errors
            })
        })
    } catch(e){
        consol.log(e);
        res.status(500).json({success:false})
    }
});

module.exports = route;