import mongoose, { Schema } from 'mongoose';

const content_typeSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  },
  { timestamps: true } // Add this option to include createdAt and updatedAt fields
);

export const User = mongoose.model('User', content_typeSchema);
