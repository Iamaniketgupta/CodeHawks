import Mentor from "../models/mentor.model.js";
import Timeslot from "../models/timeslot.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addTimeslot = asyncHandler(async (req, res) => {
    const { date, month, monthName, time } = req.body;
    // console.log(req.mentor._id)
    if (!(date && time && month && monthName)) {
        throw new ApiError(400, "All fields are required");
    }

    const userId = req.mentor._id;
    if (!userId) {
        throw new ApiError(401, "Mentor Id Not found");
    }
    const user = await Mentor.findById(userId);

    if (!user) {
        throw new ApiError(400, "Mentor dont exist");
    }

    const slot = await Timeslot.create(
        {
            date,
            time,
            monthName,
            month,
            mentor: user._id
        }
    );

    console.log(slot)
    if (!slot) {
        throw new ApiError(500, "Error while making slot");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            slot,
            "Time slot made successfully"
        )
    )
})

const deleteTimeslot = asyncHandler(async (req, res) => {
    const { slotId } = req.body;
    if (!slotId) {
        throw new ApiError(400, "Slot id is required");
    }

    const timeslot = await Timeslot.findById(slotId);
    if (!timeslot) {
        throw new ApiError(400, "Time slow dont exist");
    }

    const slot = await Timeslot.findByIdAndDelete(slotId);
    if (!slot) {
        throw new ApiError(500, "Error while deleting time slot");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Slot deleted successfully"
        )
    )

});

const getAllSlots = asyncHandler(async (req, res) => {
    const {mentorId} = req.body;
    console.log(mentorId)
    if (!mentorId) {
        throw new ApiError(404,"Failed to get data");
    }
    const timeSlots = await Timeslot.find({mentor:mentorId}).select("-mentor");
    
    if (!timeSlots || timeSlots.length === 0) {
        throw new ApiError(404, "No Slots Found");
    }

    res.status(200).json({
        data: timeSlots,
    })
}
)



export {
    addTimeslot,
    deleteTimeslot,
    getAllSlots
}