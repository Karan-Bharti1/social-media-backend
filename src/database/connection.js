const mongoose=require('mongoose')
// const url = 'mongodb+srv://pregradStudent:99146%40Kar@pregrad.u0frq5f.mongodb.net/?appName=Pregrad';

const connectDB=async()=>{
await mongoose.connect('mongodb+srv://pregradStudent:99146%40Kar@pregrad.u0frq5f.mongodb.net/SocialMedia')
}

module.exports={connectDB}