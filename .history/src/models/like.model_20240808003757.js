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
  updatedAt: { type: Date, default: Date.now},

});
export const like = mongoose.model("like", likeSchema);
