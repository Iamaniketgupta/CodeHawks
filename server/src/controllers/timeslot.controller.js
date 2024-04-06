import { Mentee } from "../models/mentee.model.js";
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
            date:date,
            time:time,
            monthName:monthName,
            month:month,
            mentor: user._id
        }
    );

    // console.log(slot)
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
    const  slotId  = req.params.slotId;
    // console.log(slotId)

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
    const mentorId = req.query.mentorId;
    // console.log("Requested mentor ID:", mentorId);

    if (!mentorId) {
        throw new ApiError(404, "Failed to get data - mentorId not provided");
    }

    const timeSlots = await Timeslot.find({ mentor: mentorId }).select("-mentor");
    // console.log("Found time slots:", timeSlots);

    if (!timeSlots || timeSlots.length === 0) {
        return res.status(200).json({
            data: [],
            message: "No Slots Found",
        });
    }

    res.status(200).json({
        data: timeSlots,
    });
});

// booking controller
const bookSlot = asyncHandler(async (req, res) => {
    const  timeslotId  = req.body.selectedSlot;
    const userId  = req.user._id; // Assuming you have userId in the request

    const timeslot = await Timeslot.findById(timeslotId);
    if (!timeslot) {
        return res.status(404).json({ message: 'Timeslot not found' });
    }

    if (timeslot.isBooked) {
        return res.status(400).json({ message: 'Timeslot already booked' });
    }

    const mentee = await Mentee.findById(userId);
    if (!mentee) {
        return res.status(404).json({ message: 'Mentee not found' });
    }

    if (mentee.bookedSlots.includes(timeslotId)) {
        return res.status(400).json({ message: 'You have already booked this timeslot' });
    }

    timeslot.isBooked = true;
    await timeslot.save();

    mentee.bookedSlots.push(timeslotId);
    await mentee.save();

    res.status(200).json({ message: 'Timeslot booked successfully' });
});  



export {
    addTimeslot,
    deleteTimeslot,
    getAllSlots,
    bookSlot
}