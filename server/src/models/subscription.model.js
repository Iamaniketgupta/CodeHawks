import mongoose, { Mongoose, Schema } from "mongoose";


const subscriptionSchema = new Schema(
    {
        price : {
            type:Number,
            required:true
        },
        mentor : {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Mentor",
            required: true
        },
        mentee:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Mentee",
            required: true
        },
        months:{
            type:Number,
            required:true
        }
    }
)


export const Subscription = mongoose.model("Subscription", subscriptionSchema);
