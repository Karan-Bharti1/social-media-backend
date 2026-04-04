const express=require("express")
const app=express()
const {userAuth}=require("./middleware/auth")
const {connectDB}=require("./database/connection") 
const User=require('./models/user')
const cookieParser = require('cookie-parser')
const bcrypt=require('bcrypt')
const {validateSignUpData}=require("./utils/validateSignUpData")
const { isJWT } = require("validator")
const jwt = require('jsonwebtoken')

app.use(express.json())
app.use(cookieParser())
app.post("/signup",async(req,res)=>{  
// Validate the data req.body
validateSignUpData(req)
// Encrypt the password
const {password,firstName,lastName,email}=req.body
const passwordHash= await bcrypt.hash(password, 10)
console.log(passwordHash)
    const user=new User({firstName,lastName,email,password:passwordHash})// Intance of the model
    try{
await user.save()
res.send("Data Sent Successfuly")   
    }catch(err){
res.status(400).send({errorMessage:"Something went wrong!",err})

    }
})
app.post("/login",async function(req,res){
try{
const {email,password}=req.body
const user=await User.findOne({email:email.toLowerCase()})

if(!user){
    throw new Error("Invalid User")
}


const isPassword=await bcrypt.compare(password,user.password)
if(isPassword){
    // Create JWT token
const token=await jwt.sign(
    {_id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"}
)
    // Add the token to the cookie and send it as a response
    res.cookie("token",token)
    res.send("Login Succesfull")

}else {
    throw new Error("Invalid User!!")
}
}catch(err){
    res.status(400).send({errorMessage:"Something went wrong!",err})
}
})

app.get("/profile",userAuth,async(req,res)=>{
    try{
const user=req.user
res.send({message:"User Logged",user})
    }catch(err){
         res.status(400).send({errorMessage:"Something went wrong!",err})
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
const updatedData=await User.findByIdAndUpdate(data._id,data,{returnDocument:"after"},{runValidators:true})
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