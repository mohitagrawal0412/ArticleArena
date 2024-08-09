import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: {
      type: String, // cloudinary url
      required: true,
    },
  },
  { timestamps: true } // Add this option to include createdAt and updatedAt fields
);

// save function to


export const User = mongoose.model("User", userSchema);
