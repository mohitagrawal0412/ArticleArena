import mongoose from "mongoose";
import { DB_NAME } from "../constants.js"
// Connect to MongoDB

const connectDb= async()=>{

    try{
        const connectionInstance= await mongoose.connect()
    }



}