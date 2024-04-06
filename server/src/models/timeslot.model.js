import mongoose, { Schema } from "mongoose";


const timeslotSchema = new Schema(
  {
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    monthName:{
      type: String,
      required: true,
    },
    month:{
      type: String,
      required: true,
    },
    isBooked:{
      type: Boolean,
      default: false,
    },
    mentor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mentor',
    }
  },
  { timestamps: true }
);

const Timeslot = mongoose.model("Timeslot", timeslotSchema);

export default Timeslot;
