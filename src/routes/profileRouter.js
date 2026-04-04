const express=require("express")
const { userAuth } = require("../middleware/auth")
const profileRouter=express.Router()
const validateEditProfileData=require("../utils/validateEditProfileData")
profileRouter.get("/profile/view",userAuth,async(req,res)=>{
    try{
const user=req.user
res.send({message:"User Data fetched successfully",user})
    }catch{
     res.status(400).send({errorMessage:"Something went wrong!",err})
    }
})

profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
    try{
        if(!validateEditProfileData(req)){
            throw new Error("Invalid Edit Request")
        }
const user=req.user
console.log(user)
Object.keys(req.body).forEach(key=>user[key] = req.body[key])
await user.save()
res.send(`${user.firstName}, your data has been updated successfully`)
    }
    catch(err){
     res.status(400).send({errorMessage:"Something went wrong!",err})
    }
})
module.exports=profileRouter