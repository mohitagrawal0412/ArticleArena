import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    creator: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: mongoose.Types.ObjectId,
      ref:'title'
    
    },
   photos:{
    type
   }
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
