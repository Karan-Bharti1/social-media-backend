const  express=require("express")
const userRouter=express.Router()
const {userAuth}=require("../middleware/auth")
const ConnectionRequestModel=require("../models/connectionRequest")
const User=require("../models/user")
userRouter.get("/user/requests/received",userAuth,async(req,res)=>{
try{
const loggedInUser=req.user
const connectionRequests=await ConnectionRequestModel.find({
    toUserId:loggedInUser._id,
    status:"interested"
}).populate("fromUserId","firstName lastName age profileurl")

res.json({
    message:"Received requests data fetched Successfully",
    data:connectionRequests

})
}catch(err){
res.status(400).send("Error: "+ err.message)
}}
)

userRouter.get("/user/connections",userAuth,async(req,res)=>{
    try{
        const loggedInUser=req.user;
const connectionRequests=await ConnectionRequestModel.find({
   $or:
   [
    {toUserId:loggedInUser._id,status:"accepted"},
    {fromUserId:loggedInUser._id,status:"accepted"}
   ] 
}).populate("fromUserId","firstName lastName age profileurl")
.populate("toUserId","firstName lastName age profileurl")

    const data = connectionRequests.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    res.json({ data,message:"Connections Data fetched" });
    }catch(err){
        res.status(400).send("Error: "+ err.message)
    }
}),
userRouter.get("/feed/:page/:limit", userAuth, async (req, res) => {
    try{
        const loggedInuser=req.user
        const page=req.params.page
      
        const limit=req.params.limit || 10
        const skip=(page-1)*limit
const connectionRequests=await ConnectionRequestModel.find({
    $or:[{fromUserId:loggedInuser._id},{toUserId:loggedInuser._id}]
}).select("fromUserId toUserId")

const hideUsersFromFeed=new Set() // Data structure
connectionRequests.forEach((req)=>{
    hideUsersFromFeed.add(req.fromUserId.toString())
     hideUsersFromFeed.add(req.toUserId.toString())
})
const users=await User.find({
    $and : [
    {_id:{ $nin : Array.from(hideUsersFromFeed)}},
    {_id:{$ne:loggedInuser._id}}
]}).select("firstName lastName age profileurl").skip(skip).limit(limit)
console.log(users.length)

res.json({data:users,message:"User Feed fetched successfully"})

        
    }catch(error){
       res.status(400).send("Error: "+ err.message)  
    }
})
module.exports=userRouter;

