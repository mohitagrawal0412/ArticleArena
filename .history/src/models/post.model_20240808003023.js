import mongoose, { Schema } from 'mongoose';

const postSchema = new Schema(
  {
        crea
  },
  { timestamps: true } // Add this option to include createdAt and updatedAt fields
);

export const User = mongoose.model('User', userSchema);
