import mongoose from "mongoose";



const category = [
  "Rugby" , "Football" , "Tennis" , "Badminton" ,"Running" , "Basketball" , "Golf" , "Gym Session" , "Squash" , "Social Event" , "Cricket" , "Cycling" , "Hockey" ,"Netball"
]

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default:[] // Assuming you have a User model
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the user who created the team
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  category:{
    type:String,
    enum:category
  }
});

// Using ES6 syntax for exporting
export const Team = mongoose.model('Team', teamSchema);

// Using CommonJS syntax for exporting
// module.exports = mongoose.model('Team', teamSchema);
