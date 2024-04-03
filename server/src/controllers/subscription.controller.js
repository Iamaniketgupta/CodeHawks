import { Mentee } from "../models/mentee.model.js";
import Mentor from "../models/mentor.model.js";
import { Subscription } from "../models/subscription.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const getSubscription = asyncHandler(async(req,res)=>{
    const {mentorId , menteeId , price , months} = req.body;
    if(!(mentorId && menteeId && price && months)){
        throw new ApiError(400 , "All fields are required");
    }

    const mentor = await Mentor.findById(mentorId);
    if(!mentor){
        throw new ApiError(400 , "mentor dont exist");
    }

    const mentee = await Mentee.findById(menteeId);
    if(!mentee){
        throw new ApiError(400 , "Mentee dont exist");
    }

    const subscription = await Subscription.create(
        {
            mentor:mentorId,
            mentee:menteeId.
            price,
            months
        }
    );

    if(!subscription){
        throw new ApiError(500 , "Error while creating subscription");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            subscription,
            "Subscription made successfully"
        )
    )
})

export {
    getSubscription
}