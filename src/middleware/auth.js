const userAuth=(req,res,next)=>{
    const token="xyz"
    const userAuthenticated=token ==="xyz"
    if(!userAuthenticated){
        res.status(401).send("User Not Authenticated")
    }else{
next()
    }
}

module.exports={
    userAuth
}