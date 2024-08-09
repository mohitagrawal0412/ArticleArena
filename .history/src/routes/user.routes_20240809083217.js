import express from "express";
const router = express.Router();
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
  router.post(
    "/register",
    upload.field([
      { name: "avatar", maxCount: 1 },
      { name: "coverImage", maxCount: 5 },
    ]),
    registerUser,
  );