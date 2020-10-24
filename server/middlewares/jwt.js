const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = (req,res,next) => {
    const token = (req.get('x-access-token') || req.body['x-access-token'] || req.query['x-access-token'] || req.headers['x-access-token'] || null);
    
    jwt.verify(token,'specialvisiontoken', async (err,decodedData) => {
        if(err){
            res.status(401).json({
                   success: false,
                   errors: {},
                   result: []
            })
        } else{
            const {nickname} = decodedData;
            try{
                await User.findOne(nickname,(err,user) => {
                    if(err){
                        res.status(401).json({
                            success: false,
                            errors: {},
                            result: []
                        })
                    } else if(user){
                        req.CurrentUser = user;
                        next();
                    }
                })
            } catch(e){
                res.status(500).json({
                    success: false,
                    errors: {},
                    result: []
                })
            }
        }
    })
}