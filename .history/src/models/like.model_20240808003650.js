import mongoose, { Schema } from "mongoose";
const likeSchema = new Schema({
    post_id:{
        
    }

});
export const like = mongoose.model("like", likeSchema);
