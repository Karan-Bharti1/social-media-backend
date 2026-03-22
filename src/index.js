const express=require("express")
const app=express()
const {userAuth}=require("./middleware/auth")
const {connectDB}=require("./database/connection") 
const User=require('./models/user')
app.use(express.json())
app.post("/signup",async(req,res)=>{  
    const user=new User(req.body)// Intance of the model
    console.log(user)
    try{
await user.save()
res.send("Data Sent Successfuly")   
    }catch(err){
res.status(400).send("Something went wrong!")
console.log(err)
    }
})
app.get("/feed",async(req,res)=>{
    try{
 const usersData=await User.find()
 if(users.length>0 ){
res.send(usersData)
 }
 res.status(404).send("Data Not Found")
    }catch (err){
        res.status(400).send("Something went wrong")
    }
})
app.get("/useremail",async(req,res)=>{
    const userEmail=req.body.email
    try{
const usersData=await User.find({email:userEmail})
res.send(usersData)
    }catch(err){
         res.status(400).send("Something went wrong")
    }
})
app.delete("/user",async(req,res)=>{
    const deleteUserId=req.body._id
    try{
        const user=await User.findByIdAndDelete(deleteUserId)
res.send("User Deleted Successfully")
    }catch(err){
         res.status(400).send("Something went wrong")

         }
})
app.patch("/user",async(req,res)=>{
    const data=req.body
    try{
const updatedData=await User.findByIdAndUpdate(data._id,data,{returnDocument:"after"})
if(updatedData){
    res.send({message:"Data Updated Successfully",
        data:updatedData
    })
}
    }catch(err){
           res.status(400).send("Something went wrong")
    }
})
connectDB()
.then(()=>{
    console.log("Database Connection established !!")
    app.listen(7000,()=>{
console.log("Server is running on PORT 7000")
})
})
.catch(err=>console.error("Database Connection Not established !!"))

// The functions that you put in the middle are known middlewares