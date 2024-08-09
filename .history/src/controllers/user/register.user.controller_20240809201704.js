import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { User } from "../../models/user.model.js";
import { uploadOnCloudinary } from "../../utils/Cloudinary.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, userName, password } = req.body;

  // Validate input fields
  if ([name, email, userName, password].some((field) => field?.trim() === "")) {
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

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  if (!avatar) throw new ApiError(400, "Failed to upload avatar");

  // Create new user
  const newUser = new User({
    name,
    email,
    userName,
    password,
    avatar: avatar.secure_url,
  });

  // Make sure `userName` is not null
  if (!newUser.userName) {
    throw new ApiError(400, "Username is required");
  }

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
export { registerUser };
