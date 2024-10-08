import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
y
    // upload file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    console.log(response.url);
    console.log("file is uploaded to cloudinary");
    // fs.unlink(localFilePath); // remove the locally saved temporary file as the
    // upload operation got failed  }
    fs.unlinkSync(localFilePath);

    return response;
  } catch (error) {
    fs.unlink(localFilePath); // remove the locally saved temporary file as the
    // upload operation got failed  }
    return null;
  }
};
export { uploadOnCloudinary };
