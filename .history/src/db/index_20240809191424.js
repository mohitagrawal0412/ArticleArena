import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

import { DB_NAME } from "../constants.js";

console.log("MONGODB_URI:", process.env.MONGODB_URI);

const connectDB = async () => {
  try {
    // Ensure the connection string starts with the correct prefix
 
    const connectionInstance = await mongoose.connect(mongoUri, {
   
    });

    console.log(
      `MongoDB Connected!! DB Host: ${connectionInstance.connection.host}`,
    );
  } catch (error) {
    console.log("MongoDB Connection failed!!", error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
