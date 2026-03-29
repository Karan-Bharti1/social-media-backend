const mongoose=require('mongoose')
const validator = require('validator');
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Please write a valid email")
            }
        }
    },
    age:{
        type:Number,
        
    },
    profileurl:{
type:String,
default:"https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg"
    },
  password:{
type:String,
required:true,

        },
        skills:{
            type:[String]
        },
        gender:{
            type:String,
            validate(value){
                if(!["male","female","others"].includes(value)){
                    throw new Error("Please write a valid gender value")
                }
            }
        },
        
    
},{
    timestamps:true
})
const User=mongoose.model("User",userSchema)

module.exports=User