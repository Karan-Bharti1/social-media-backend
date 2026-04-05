const express=require("express")
const { userAuth } = require("../middleware/auth")
const ConnectionRequestModel = require("../models/connectionRequest")
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
const ConnectionRequest=new ConnectionRequestModel({
    fromUserId,toUserId,status
})
const data=await ConnectionRequest.save()

res.send({statusConnectionRequest:`${status}`, data:data})
    }catch(err){
        console.log(err)
res.status(400).send({message:"Connection request not sent",err})
    }
})

module.exports={requestRouter}

