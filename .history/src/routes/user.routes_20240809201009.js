import express from "express";
import multer from "multer";

import { registerUser } from "../controllers/user/register.user.controller.js";
import { loginInUser } from "../controllers/user/login.user.controller.js";

const userRouter = express.Router();
// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Use multer middleware to handle file uploads
userRouter.post(
  "/register",
  upload.fields([{ name: "avatar", maxCount: 1 }]),
  registerUser,
);

userRouter.route("/login").post(loginInUser);
export default router;
