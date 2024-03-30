// models/Event.js
import mongoose from 'mongoose';

const { Schema, model } = mongoose;



const category = [
  "Rugby" , "Football" , "Tennis" , "Badminton" ,"Running" , "Basketball" , "Golf" , "Gym Session" , "Squash" , "Social Event" , "Cricket" , "Cycling" , "Hockey" ,"Netball"
]

const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time:{
    type:String
  },
  location: {
    type: String,
    required: true,
  },
  organizer: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model for the organizer
    required: true,
  },
  participants: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default:[] // Reference to the User model for each participant
    },
  ],
  category:{
    type:String,
    enum:category
  },
  phoneNo:{
    type:String
  }
});

export const Event = model('Event', eventSchema);

// export default Event;
