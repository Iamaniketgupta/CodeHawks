import Stripe from "stripe";
import { Mentee } from "../models/mentee.model.js";
import Mentor from "../models/mentor.model.js";
import { Subscription } from "../models/subscription.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Pricing } from "../models/pricing.model.js";



const stripe = new Stripe(process.env.STRIPE_SECRET);

const getCheckoutSessionAndHandleWebhook = asyncHandler(async (req, res) => {

    const { mentorId } = req.params;
    const { _id, email } = req.body;

    
            const subscription = new Subscription({
                mentor: mentorId,
                mentee: _id,
                price: pricing.mentorshipPrice, // Amount is in cents, convert to base unit
            })
            await subscription.save();

            res.status(200).send({});
        }

);



const getUserSubscribers = asyncHandler(async(req,res)=>{
    const {mentorId} = req.body;
    // console.log(mentorId);
    if(!mentorId){
        throw new ApiError(400 , "Mentor id is required");
    }

    // console.log(mentorId)
    const subscription = await Subscription.find({ mentor: mentorId })
    .populate(
        {
            path:"mentee"
        }
    );

    if(!subscription){
        throw new ApiError(500 , "Subscription not found");
    }


    const mentees = subscription.map(sub => {
        return {
            _id: sub.mentee._id,
            fullName: sub.mentee.fullName,
            avatar: sub.mentee.avatar,
            state:sub.mentee.state,
            country:sub.mentee.country,
            interests:sub.mentee.interests
        };
    }); 

    if(!mentees){
        throw new ApiError(500 , "Some error happend");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            mentees,
            "Subscribed mentees fetched successfully"
        )
    )

});


const getMenteeSubscriptions = asyncHandler(async(req,res)=>{
    
    const menteeId = req.user._id;
   
    if(!menteeId)
    throw new ApiError(401 , "Please Login");

    const mentee = await Mentee.findById(menteeId);
    if(!mentee){
        throw new ApiError(400 , "user not found");
    }
    
    const subscriptions = await Subscription.find(
        {
            mentee:menteeId
        }
    ).populate(
        {
            path:"mentor",
            select:"avatar fullName"
        }
    );
    if(!subscriptions){
        throw new ApiError(500 , " Error while getting Subscriptions");
    }
    
    return res.status(200).json(
        new ApiResponse(
            200,
            subscriptions,
            "Mentor subscriptions fetched successfully"
))
})




export {

    getCheckoutSessionAndHandleWebhook,
    getUserSubscribers,
    getMenteeSubscriptions

}