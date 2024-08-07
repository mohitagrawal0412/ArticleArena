import mongoose, { Schema } from "mongoose";
const likeSchema = new Schema({
    post_id:{
        type: Schema.Types.ObjectId,
        ref: "Post"
    },
    likedBy: { type: Schema.Types.O

});
export const like = mongoose.model("like", likeSchema);
