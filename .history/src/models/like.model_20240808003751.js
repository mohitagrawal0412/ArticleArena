import mongoose, { Schema } from "mongoose";
const likeSchema = new Schema({
  post_id: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },
  likedBy: { 
    type: Schema.Types.ObjectId, 
    ref: "user" 
  },
  createdAt: { type: Date, default: Date.now  },
  up

});
export const like = mongoose.model("like", likeSchema);
