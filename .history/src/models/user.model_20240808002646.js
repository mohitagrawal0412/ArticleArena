import mongoose, { Schema } from "mongoose";
const userSchema = new Schema(
    {
         name: { type: String, required: true },
         email: { type: String, required: true, unique: true },
         password: { type: String, required: true },
         role: { type: String, enum: ["admin", "user"], default: "user" },
         isActive: { type: Boolean, default: true }
    },

})
export const User = mongoose.model("User", userSchema);
