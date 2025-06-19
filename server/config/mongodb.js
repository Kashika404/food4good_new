import mongoose from "mongoose";

const connectDB=async ()=>{
    mongoose.connection.on('connected',()=>{
        console.log("Datebase connected")
    })
    await mongoose.connect(`${process.env.MONGODB_URI}/food4good`)
}

export default connectDB;