import express from "express";
import multer from "multer";
import { registerUser } from "../controllers/user/register.user.controller.js";
import { loginInUser } from "../controllers/user/login.user.controller.js";

const userRouter = express.Router(); // Create a new router instance

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp"); // Directory for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Filename with timestamp
  },
});

const upload = multer({ storage: storage }); // Initialize multer with storage config

// Define routes
userRouter.post(
  "/register",
  upload.fields([{ name: "avatar", maxCount: 1 }]), // Handle file uploads
  registerUser // Controller to handle registration
);

userRouter.post("/login", loginInUser); // Controller to handle login

export default userRouter; // Export the router instance
