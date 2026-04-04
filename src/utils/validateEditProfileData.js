const validateEditProfileData=(req)=>{
const allowedFields=["firstName","lastName","gender","profileurl","age","skills"]
const isEdit=Object.keys(req.body).every(field=>allowedFields.includes(field))
return isEdit
}
module.exports={validateEditProfileData}