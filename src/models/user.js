const mongoose=require('mongoose')

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
        lowercase:true
    },
    age:{
        type:Number,
        
    },
  password:{
type:String,
required:true,
minlength:8,
maxlength:12
        },
        gender:{
            type:String,
            validate(value){
                if(!["male","female","others"].includes(value)){
                    throw new Error("Please write a valid gender value")
                }
            }
        }
    
})
const User=mongoose.model("User",userSchema)

module.exports=User