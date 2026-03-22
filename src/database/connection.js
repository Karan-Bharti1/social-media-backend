const mongoose=require('mongoose')
const dotenv=require('dotenv')
// const url = 'mongodb+srv://pregradStudent:99146%40Kar@pregrad.u0frq5f.mongodb.net/?appName=Pregrad';
dotenv.config()
const connectDB=async()=>{
await mongoose.connect(process.env.MONGODB_URI)
}

module.exports={connectDB}