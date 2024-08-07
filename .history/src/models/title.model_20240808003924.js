import mongoose, { Schema } from 'mongoose';

const titleSchema = new Schema(
  {
        
  },
  { timestamps: true } // Add this option to include createdAt and updatedAt fields
);

export const title = mongoose.model('title', titleSchema);
