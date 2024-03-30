import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const skillLevelsEnum = ['Beginner', 'Intermediate', 'Professional'];
const sportsInterestEnum = [
  "Rugby" , "Football" , "Tennis" , "Badminton" ,"Running" , "Basketball" , "Golf" , "Gym Session" , "Squash" , "Social Event" , "Cricket" , "Cycling" , "Hockey" ,"Netball"
]// Add your specific sports interests

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  phoneNo: {
    type: String,
    required: true,
    unique: true,
  },
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
  sportsInterest: {
    type: [{ type: String, enum: sportsInterestEnum }],
  },
  location: {
    type: String,
  },
  coordinates: {
    latitude: {
      type: String,
    },
    longitude: {
      type: String,
    },
  },
  skillLevels: {
    type: String,
    enum: skillLevelsEnum,
  },
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: [],
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: [],
  }],
  refreshToken: {
    type: String,
    default: null, // or any default value you prefer
  },
});

userSchema.pre("save" , async function(next){
    if(!this.isModified("password"))  return next();
    this.password = await bcrypt.hash(this.password , 10);
    next();
});

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password , this.password);
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id:this._id,
            username:this.username,
            email:this.email,
            fullName : this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    );
}

userSchema.methods.generateRefreshToken =  function(){
    return jwt.sign(
        {
            _id:this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    );
}

export const User = mongoose.model("User", userSchema);
