import dotenv from "dotenv";

import { app } from "./app.js";
import connectDB from "./db/index.js";

// Load environment variables from .env file
dotenv.config({ path: "./.env" });

// Start the server after connecting to the database
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port ${process.env.PORT || 8000}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed: ", err);
    process.exit(1);
  });
