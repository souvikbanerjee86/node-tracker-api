const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = (req,res,next) =>{
    var {authorization}= req.headers;
    if(!authorization){
        return res.status(401).send({error:'You must be logged in'});
    }

    var token = authorization.replace("Bearer", "");
    token = token.trim();
    jwt.verify(token, 'MY_SECRET_KEY',async (err,payload)=>{
        if(err){
            return res.status(401).send({error:'You must be logged in'});
        }
        const user = await User.findById(payload.userId);
        if(!user){
            return res.status(401).send({error:'You must be logged in'});
        }
        req.user = user;
        next();
    })
}