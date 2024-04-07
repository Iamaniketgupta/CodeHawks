import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const menteeSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: "https://res.cloudinary.com/dsj5kuvj4/image/upload/v1712154743/ccbliuoote9hm8n4pngj.webp"
  },
  country: {
    type: String,
  },
  state: {
    type: String
  },
  interests: [
    {
      type: String,
    }
  ],
  languages: [
    {
      type: String,
    }
  ],
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
  },
  age: {
    type: Number,
  },
  bookmarked_mentors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mentor',
    default: [],
  }],

  bookedSlots: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Timeslot"
  }],
  
  myMeetings: [{
    type: Schema.Types.ObjectId,
    ref: "Meeting",
  }],

  experience: {
    type: String
  },
  linkedin: {
    type: String
  },
  refreshToken: {
    type: String,
    default: null, // or any default value you prefer
  },
  isMentor:{
    type:Number,
    default:0
  }
});

menteeSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

menteeSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
}

menteeSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
      fullName: this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
  );
}

menteeSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
  );
}

export const Mentee = mongoose.model("Mentee", menteeSchema);
