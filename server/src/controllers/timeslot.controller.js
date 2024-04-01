import Mentor from "../models/mentor.model.js";
import Timeslot from "../models/timeslot.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addTimeslot = asyncHandler(async(req,res)=>{
    const {date , hours , minutes} = req.body;
    // console.log(req.mentor._id)
    const userId = req.mentor._id;
    const user = await Mentor.findById(userId);

    if(!(date && hours && minutes)){
        throw new ApiError(400 , "All fields are required");
    }

    if(!user){
        throw new ApiError(400 , "Mentor dont exist");
    }

    const slot = await Timeslot.create(
        {
            date,
            time:{
                hours,
                minutes
            },
            mentor:user._id
        }
    );

    console.log(slot)
    if(!slot){
        throw new ApiError(500 , "Error while making slot");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            slot,
            "Time slot made successfully"
        )
    )
})

const deleteTimeslot = asyncHandler(async(req,res)=>{
    const {slotId} = req.body;
    if(!slotId){
        throw new ApiError(400 , "Slot id is required");
    }

    const timeslot = await Timeslot.findById(slotId);
    if(!timeslot){
        throw new ApiError(400 , "Time slow dont exist");
    }

    const slot = await Timeslot.findByIdAndDelete(slotId);
    if(!slot){
        throw new ApiError(500 , "Error while deleting time slot");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Slot deleted successfully"
        )
    )

})

export{
    addTimeslot,
    deleteTimeslot
}