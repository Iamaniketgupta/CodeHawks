import mongoose, { Schema } from "mongoose";


const TimeSchema = new Schema({
    hours: {
      type: Number,
      required: true,
    },
    minutes: {
      type: Number,
      required: true,
    },
  });


const timeslotSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: TimeSchema,
      required: true,
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
