import mongoose, { Schema } from "mongoose";
const likeScehma = new Schema({});
export const like = mongoose.model("like", likeScehma);
