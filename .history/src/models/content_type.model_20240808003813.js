import mongoose, { Schema } from 'mongoose';

const content_typeSchema = new Schema(
  {
    
  },
  { timestamps: true } // Add this option to include createdAt and updatedAt fields
);

export const Content_type = mongoose.model('Content_type', content_typeSchema);
