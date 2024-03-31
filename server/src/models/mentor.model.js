import mongoose, { Schema } from "mongoose";

const mentorWorkSchema = new Schema({
    position: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    currentlyWorking: {
        type: Boolean,
        default: false
    }
});

 mongoose.model("MentorWork", mentorWorkSchema);


const mentorSchema = new Schema({
    avatar: {
        type: String,
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

    rating: {
        type: Number,
        default: 0
    },

    workExp: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "MentorWork",
    }],

    linkedin: {
        type: String,
        trim: true,
        lowercase: true
    },

    experience:{
        type: Number,
        required: true,
    },
 
    languages: [{
        type: String,
        trim: true
    }],
    country:{
        type: String,
        required: true,
    },

    state:{
        type:String,
        required:true
    },
    
    refreshToken:{
        type:String,
    }

}, { timestamps: true });

// Hashing
mentorSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Check Password
mentorSchema.methods.isPasswordCorrect = async function (password) {  
    return await bcrypt.compare(password, this.password)
}

// JWT ACCESS TOKEN
mentorSchema.methods.generateAccessToken = async function () {  
    return Jwt.sign(
        // payload
        {   
            _id:this._id,
            email:this.email,
            fullName:this.fullName

        }, process.env.ACCESS_TOKEN_SECRET,

        // expiry
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        });
}

// JWT REFRESH TOKEN
mentorSchema.methods.generateRefreshToken = async function () { 
    return Jwt.sign(
        {   
            _id:this._id,

        }, process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        });

}

const Mentor = mongoose.model("Mentor", mentorSchema);

export default Mentor;