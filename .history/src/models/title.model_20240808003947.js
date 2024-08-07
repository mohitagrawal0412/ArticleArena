import mongoose, { Schema } from 'mongoose';

const titleSchema = new Schema(
  {
        title_name:{}
  },
  { timestamps: true } // Add this option to include createdAt and updatedAt fields
);

export const Title = mongoose.model('Title', titleSchema);
