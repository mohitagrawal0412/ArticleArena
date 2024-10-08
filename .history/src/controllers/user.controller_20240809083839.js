import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { response } from "express";
import jwt from "jsonwebtoken";

// generate acccess and refresh token funciton because we gonna use it many times
const generateAccessAndRefreshToken = async (userId) => {
    try {
      const user = await User.findById(userId);
      const accessToken = user.generateAccessToken();
      const refreshToken = user.generateRefreshToken();
      user.refreshToken = refreshToken;
  
      await user.save({ validateBeforeSave: false });
      return { accessToken, refreshToken };
    } catch (error) {
      throw new ApiError(
        500,
        "something went wrong while generating access and refresh token",
      );
    }
  };
  
  /// register user Controller
  const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, password } = req.body;
    console.log(email);
  
    // Validate input fields
    if (
      [fullName, email, password].some((field) => field?.trim() === "")
    ) {
      throw new ApiError(400, "All fields are required");
    }
  
    // Check if user already exists
    const existedUser = await User.findOne({
      $or: [{ email }, { userName }],
    });
    if (existedUser) {
      throw new ApiError(400, "Email or username already exists");
    }
  
    // Check for avatar and cover image uploads
    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    // const coverImageLocalPath = req.files?.coverImage?.[0]?.path;
  
    // agar cover image upload nhi krega phir v register hona chaye ,, avatarlocalfilepath wala
    // mandatory hai to ushka process sahi hai
    // coverimagelocalpath k liye classic if else lga skte h
   
  
    if (!avatarLocalPath) throw new ApiError(400, "Please upload avatar");
  
    // Upload images to Cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath);
 
  
    if (!avatar) throw new ApiError(400, "Failed to upload avatar");
  
    // Create new user
    const newUser = new User({
      fullName,
      email,
      password,
      avatar: avatar.secure_url,
  
    });
  
    await newUser.save();
  
    // Fetch created user without password and refreshToken
    const createdUser = await User.findById(newUser._id).select(
      "-password -refreshToken",
    );
    if (!createdUser)
      throw new ApiError(500, "Something went wrong while registering user");
  
    return res
      .status(200)
      .json(new ApiResponse(200, createdUser, "User registered successfully"));
  });
  
  // login user controller
  const loginInUser = asyncHandler(async (req, res) => {
    // take value of email and username and password from body
    const { email, userme, password } = req.body;
  
    // we can login through username or email , either of two
    if (!userName && !email)
      throw new ApiError(400, "Username or email is required");
  
    // get user from db by finding it from db
    const user = await User.findOne({
      $or: [{ userName }, { email }],
    });
  
    // checking we got user or not
    if (!user) throw new ApiError(400, "User not found");
  
    // now checking password, after confirming username or email
    const isPasswordValid = await user.isPasswordCorrect(password);
    console.log("Entered Password: ", password);
    console.log("Stored Hashed Password: ", user.password);
    console.log("Is Password Valid: ", isPasswordValid);
  
    // confirm password
    if (!isPasswordValid)
      throw new ApiError(401, "Invalid user credentials, password is wrong");
  
    // generate access token and refresh token
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id,
    );
  
    const loggedInuser = await User.findById(user._id).select(
      "-password -refresh-token",
    );
  
    // options to provide security
    const options = {
      httpOnly: true,
      secure: true,
    };
  
    // return response with cookies
    return res
      .status(200)
      .cookie("access-token", accessToken, options)
      .cookie("refresh-token", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            user: loggedInuser,
            accessToken: accessToken,
            refreshToken: refreshToken,
          },
          "User logged in successfully",
        ),
      );
  });
