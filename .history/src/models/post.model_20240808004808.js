import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    title: {
      type: Schema.Types.ObjectId,
      ref: "Title", // Reference to the Title model
      required: true,
    },
    photos: {
      type: String, // Cloudinary URL
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true } // Add this option to include createdAt and updatedAt fields
);

export const Post = mongoose.model("Post", postSchema);
