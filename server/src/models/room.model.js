// room.js
import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },team:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Team'
  },
  messages: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      text: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
      default:[]
    },
  ],
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default:[]
    },
  ],
});

export const Room = mongoose.model('Room', roomSchema);


