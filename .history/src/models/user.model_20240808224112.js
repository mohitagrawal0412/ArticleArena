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

// middleware function that executed just before save any docuument tb db

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});


// creating methods for userCeham for checking password
userSchema.methods.isPasswordCorrect=async function(enteredPassword){

console.log();

}


export const User = mongoose.model("User", userSchema);
