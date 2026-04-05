const mongoose=require('mongoose')
const connectRequestSchema=new mongoose.Schema({
fromUserId:{
    type:mongoose.Schema.Types.ObjectId,
    required:true
},
    toUserId:{
type:mongoose.Schema.Types.ObjectId,
required:true
    
},
status:{
    type:String,
    required:true,
    enum:{
        values:["ignored","interested","accepted","rejected"],
        message:`{Value} is incorrect status type`
    }
}
},{
    timestamps:true
})
connectRequestSchema.pre("save",function(next){
const connectRequest=this;
if(connectionRequest.fromUserId.equals(ConnectionRequestModel.toUserId)){
    throw new Error("Cannot send request to your ownself!!")
}

    next()
})
const ConnectionRequestModel=new mongoose.model("ConnectionRequest",connectRequestSchema)
module.exports=ConnectionRequestModel