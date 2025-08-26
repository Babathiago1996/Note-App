import mongoose from "mongoose";


const noteApp = "noteApp"; // Define your database name

export const connectDb=async()=>{
    try {
     await mongoose.connect(process.env.MONGO_URI, {dbName:noteApp})
     console.log("connected to mongodb successsfully!")
    } catch (error) {
       console.error("error connecting to mongodb:", error) 
    }
}