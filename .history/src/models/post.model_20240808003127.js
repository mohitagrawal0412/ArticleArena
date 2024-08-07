import mongoose, { Schema } from 'mongoose';

const postSchema = new Schema(
  {
        creator:{ type:String , required: true, unique: true  },
        title: { type: String, required: true },
        content: { type: String, required: true },
        comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]

  },
  { timestamps: true } // Add this option to include createdAt and updatedAt fields
);

export const User = mongoose.model('User', userSchema);
