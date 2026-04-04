const jwt = require('jsonwebtoken')
const User=require("../models/user")
const dotenv=require('dotenv')
dotenv.config()
const userAuth=async(req,res,next)=>{
try { // Get token
 const {token}=req.cookies

 // Validate the token 
 const {_id}=await jwt.verify(token,process.env.JWT_Secret)
 
 // Find the User
 const user=await User.findOne({_id})
 console.log(user)
 if(!user){
    throw new Error("User Not Found")
 }
 req.user=user
 next()}
 catch(err){
    res.status(400).send("Error"+" "+err)
 }
}

module.exports={
    userAuth
}