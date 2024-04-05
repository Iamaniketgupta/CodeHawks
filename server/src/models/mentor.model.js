import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';

const pricingSchema = new Schema({
    mentorshipPrice: {
        type: Number,
        required: true,
    },
    targetInterest: [{
        type: String,
        required: true,
    }],
    specialties: [{
        type: String,
        required: true,
    }]
});

const mentorWorkSchema = new Schema({
    company: {
        type: String,
        required: true,
    }
});

const mentorSchema = new Schema({
    avatar: {
        type: String,
        default:"https://res.cloudinary.com/dsj5kuvj4/image/upload/v1712154743/ccbliuoote9hm8n4pngj.webp"
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    education: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    rating: {
        type: Number,
        default: 0
    },
    workExp: [{
        type: String,
        required: true,
    }],
    linkedin: {
        type: String,
        trim: true,
        lowercase: true
    },
    experience: {
        type: Number,
        required: true,
    },
    languages: [{
        type: String,
        trim: true
    }],
    country: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
    },
    pricing: {
        type: pricingSchema,
    },
    status:{
        type:Boolean,
        default:false
    },
    profession:{
        type:String
    }
    
}, { timestamps: true });

mentorSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

mentorSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

mentorSchema.methods.generateAccessToken = async function () {
    return Jwt.sign(
        {
            _id: this._id,
            email: this.email,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        });
}

mentorSchema.methods.generateRefreshToken = async function () {
    return Jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        });
}

const Mentor = mongoose.model("Mentor", mentorSchema);

export default Mentor;
