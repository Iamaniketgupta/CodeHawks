import mongoose, { Mongoose, Schema } from "mongoose";


const subscriptionSchema = new mongoose.Schema(
    {
        mentor: {
            type: mongoose.Types.ObjectId,
            ref: "Doctor",
            required: true,
        },
        mentee: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        },

        Price: {
            type: String,
            required: true
        },
        session:{
            type:String,
            required:true
        },

        status: {
            type: String,
            enum: ["pending", "approved", "cancelled"],
            default: "pending",
        },
        isPaid: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);




export const Subscription = mongoose.model("Subscription", subscriptionSchema);
