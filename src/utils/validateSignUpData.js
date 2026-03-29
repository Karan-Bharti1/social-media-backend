const validator=require('validator')
const validateSignUpData=(req)=>{
const {firstName,lastName,email,password}=req.body
if(!firstName || !lastName){
    throw new Error("Name is not Valid!!")
}else if (!validator.isEmail(email)){
    throw new Error("Email is not valid")
}else if (!validator.isStrongPassword(password)){
    throw new Error("Please create a strong Password")
}
}
module.exports={validateSignUpData}