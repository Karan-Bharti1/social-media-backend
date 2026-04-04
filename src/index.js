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
const authRouter=require("./routes/authRouter")
const profileRouter=require("./routes/profileRouter")
const {requestRouter}=require("./routes/requestRouter")
app.use(express.json())
app.use(cookieParser())


app.use("/",authRouter)
app.use("/",profileRouter)
app.use("/",requestRouter)



connectDB()
.then(()=>{
    console.log("Database Connection established !!")
    app.listen(7000,()=>{
console.log("Server is running on PORT 7000")
})
})
.catch(err=>console.error("Database Connection Not established !!"))

