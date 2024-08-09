import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true
    password: { type: String, required: true },
    avatar: {
      type: String, // cloudinary url
      required: true,
    },
  },
  { timestamps: true } // Add this option to include createdAt and updatedAt fields
);

// middleware function that executed just before save any docuument tb db

// middleware that executed just before save function to bcrypt the user password ,
// isModified function check that password is changed or not
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// creating methods for usershcema for checking password
userSchema.methods.isPasswordCorrect = async function (enteredPassword) {
  console.log("Entered password", enteredPassword);
  console.log("stored hashed password", this.password);

  return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.methods.generateAccessToken = async function () {
  return jwt.sign(
    {
      _id: this.id,
      email: this.email,
      userName: this.userName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this.id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);
