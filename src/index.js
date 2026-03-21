const express=require("express")
const app=express()
const {userAuth}=require("./middleware/auth")
const {connectDB}=require("./database/connection") 
const User=require('./models/user')
app.use(express.json())
app.post("/signup",async(req,res)=>{  
    const user=new User(req.body)// Intance of the model
    try{
await user.save()
res.send("Data Sent Successfuly")   
    }catch(err){
res.status(400).send("Something went wrong!")
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