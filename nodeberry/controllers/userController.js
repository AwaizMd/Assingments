const User = require('../models/userModel');

exports.registerUser = async(req,res,next) =>{
    const {name,email,password} = req.body;

    const user=await User.create({
        name,
        email,
        password
    });
}


exports.loginUser = async(req,res,next)=>{
    
}