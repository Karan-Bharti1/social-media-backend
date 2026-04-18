const express=require("express")
const { userAuth } = require("../middleware/auth")
const ConnectionRequestModel = require("../models/connectionRequest")
const mongoose=require('mongoose')
const requestRouter=express.Router()

requestRouter.post("/request/send/:status/:userId",userAuth,async(req,res)=>{
    try{
const fromUserId=req.user._id
const toUserId=req.params.userId
const status=req.params.status
const allowedStatus=["ignored","interested"]
if(!allowedStatus.includes(status)){
   return res.status(400).json({message:"Invalid Status Request"})
}
const existingConnectionRequest=await ConnectionRequestModel.findOne({
    $or:[
        {fromUserId,toUserId},{fromUserId:toUserId,toUserId:fromUserId}
    ]
})

if(existingConnectionRequest){
    return res.status(400).send({message:"Connection request Already exists!!"})
}
const requestData=new ConnectionRequestModel({
    fromUserId,toUserId,status
})

const data=await requestData.save()

res.json({statusConnectionRequest:`${status}`, data:data})
    }catch(err){
        console.log(err)
res.status(400).send({message:"Connection request not sent",err})
    }
})


requestRouter.post("/request/review/:status/:requestId",userAuth,async(req,res)=>{
    try{
const loggedInUser=req.user


const {status,requestId}=req.params

const allowedStatus=["accepted","rejected"]
if(!allowedStatus.includes(status)){
    return res.status(400).json({message:"Status Not Allowed"})
}

const connectionRequest = await ConnectionRequestModel.findOne({
  _id: requestId,
  status:"interested"
 
})


if(!connectionRequest){
return res.status(404).json({message:"Connection request Not Found"})
}
connectionRequest.status=status
const data=await connectionRequest.save()
res.json({message:"Connection request",status,data})
    }
    catch(err){
             console.log(err)
res.status(400).send({message:"Connection request not sent",err}) 
    }
})
module.exports={requestRouter}

