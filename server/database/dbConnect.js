import mongoose from "mongoose";
const connectDB= async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`chill scnes`)
    }
    catch(error){
        console.log("error is there",error)
    }
}
export default connectDB