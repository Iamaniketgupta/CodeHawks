import mongoose, { Schema } from "mongoose";

const meetingSchema  = new Schema({
    roomId:{
        type: String,
        required: true,
        trim: true,
    },
    mentee:{
        type: Schema.Types.ObjectId,
        ref:"Mentee",
        required: true,
    },
    mentor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mentor',
        required: true,
    },
    isExpired:{
        type: Boolean,
        default: false,
    },
    date:{
        type: String,
        required: true,
        
    },
    time:{
        type: String,
        required: true,
    },
    month:{
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        default: () => new Date(+new Date() + 24 * 60 * 60 * 1000), // 24 hours from now
    },

},{timestamps:true});

const Meeting =mongoose.model("Meeting",meetingSchema);
export {Meeting};