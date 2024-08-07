import mongoose, { Schema } from "mongoose";
const likeSchema = new Schema({});
export const like = mongoose.model("like", likeScehma);
