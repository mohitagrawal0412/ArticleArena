import mongoose, { Schema } from 'mongoose';

const titleSchema = new Schema(
  {
        
  },
  { timestamps: true } // Add this option to include createdAt and updatedAt fields
);

export const Title = mongoose.model('title', titleSchema);
