import mongoose, { Schema } from "mongoose";

const likeSchema = new Schema(
  {
    post_id: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    likedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true } // Add this option to include createdAt and updatedAt fields
);

export const Like = mongoose.model("Like", likeSchema);
