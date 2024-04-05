import { asyncHandler } from "../utils/asyncHandler.js";
import cron from "node-cron";


import { Meeting } from "../models/Meeting.js";

// to create a new meeting
const createMeeting = asyncHandler(async (req, res) => {
    const { roomId, menteeId, isExpired, date, time, month } = req.body;
    const mentorId = req.mentor._id;
    try {
        const newMeeting = new Meeting({
            roomId,
            mentee: menteeId,
            mentor: mentorId,
            isExpired: isExpired || false,
            date,
            time,
            month,
        });

        const savedMeeting = await newMeeting.save();

        res.status(201).json(savedMeeting);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//  to delete a meeting by ID
const deleteMeeting = asyncHandler(async (req, res) => {
    const { meetingId } = req.params;

    try {
        const deletedMeeting = await Meeting.findByIdAndDelete(meetingId);

        if (!deletedMeeting) {
            return res.status(404).json({ message: "Meeting not found" });
        }

        res.status(200).json({ message: "Meeting deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


const getAllMeetings = asyncHandler(async (req, res) => {
    const mentorId = req.mentor._id;

    try {
        const meetings = await Meeting.find({ mentor: mentorId })
            .populate({
                path: 'mentee',
                select: 'fullName'
            });

        res.status(200).json({meetings});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const getMenteeMeetings = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    try {
        const meetings = await Meeting.find({ mentee: userId })
            .populate({
                path: 'mentor',
                select: 'fullName'
            });

        res.status(200).json(meetings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


cron.schedule("0 0 * * *", async () => {
    try {
        const expiredMeetings = await Meeting.find({
            isExpired: false,
            expiresAt: { $lt: new Date() },
        });

        await Meeting.updateMany({ _id: { $in: expiredMeetings.map(meeting => meeting._id) } }, { isExpired: true });

        console.log("Expired meetings updated successfully.");
    } catch (error) {
        console.error("Error updating expired meetings:", error);
    }
});


export {
    createMeeting,
    getAllMeetings,
    deleteMeeting,
    getMenteeMeetings
}
