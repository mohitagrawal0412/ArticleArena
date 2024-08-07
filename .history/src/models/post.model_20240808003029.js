import mongoose, { Schema } from 'mongoose';

const postSchema = new Schema(
  {
        creator: { type:string
  },
  { timestamps: true } // Add this option to include createdAt and updatedAt fields
);

export const User = mongoose.model('User', userSchema);
