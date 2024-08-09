import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { User } from "../../models/user.model.js";
import { uploadOnCloudinary } from "../../utils/Cloudinary.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

// / login user controller
const loginInUser = asyncHandler(async (req, res) => {
  // take value of email and username and password from body
  const { email, userName, password } = req.body;

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
