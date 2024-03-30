import {Event} from "../models/event.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {uploadToCloudinary} from '../utils/cloudinary.js'


const createLocalEvent = asyncHandler(async(req,res)=>{
    const userId = req.user?._id;
    console.log(userId)
    
    const user = await User.findById(userId);
    console.log(user)
    if(!user){
        throw new ApiError(400 , "User dont exist");
    }

    const {title , description , date , location , category ,phoneNo , time} = req.body;
    console.log(req.body)
    if(!(title && description && date && location && category && phoneNo && time)){
        throw new ApiError(400 , "All fields are required");
    }

    const event = await Event.create(
        {
            title,
            description,
            date,
            location,
            category,
            organizer:user._id,
            phoneNo,
            time
        }
    );
    if(!event){
        throw new ApiError(500 , "Something went wrong while creating event");
    }

    

    return res.status(200).json(
        new ApiResponse(
            200 ,
            event,
            "Event created successfully"
        )
    )
})

const deleteEvent = asyncHandler(async(req,res)=>{
    const {eventId} = req.params;
    if(!eventId){
        throw new ApiError(400 ,"Event id is required");
    }

    const event = await Event.findById(eventId);
    if(!event){
        throw new ApiError(400 , "Event dont exist");
    }

    const deletedEvent = await Event.findByIdAndDelete(eventId);
    if(!deletedEvent){
        throw new ApiError(500 , "Something went wrong while deleting the event")
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Event deleted successfully"
        )
    )

})

const addParticipant = asyncHandler(async(req,res)=>{
    const {eventId , userId} = req.params;
    if(!(userId && eventId)){
        throw new ApiError(400 , "User and event ids are required");
    }

    const event = await Event.findById(eventId);
    if(!event){
        throw new ApiError(400 , "Event dont exist");
    }

    const user = await User.findById(userId);
    if(!user){
        throw new ApiError(400 , "User dont exist");
    }

    event.participants.push(userId);
    await event.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            event.participants,
            "User added successfully to the participant list"
        )
    )
})

const removeParticipant = asyncHandler(async(req,res)=>{
    const {userId , eventId} = req.params;
    if(!(userId && eventId)){
        throw new ApiError(400 , "USer id and event id are required");
    }

    const event = await Event.findById(eventId);
    if(!event){
        throw new  ApiError(400 , "Event dont exist");
    }

    const user = await User.findById(userId);
    if(!user){
        throw new ApiError(400 , "User dont exist");
    }

    let index;
    event.participants.forEach((element , curIndex) => {
        if(element.equals(userId)) index = curIndex
    });

    if(!index){
        throw new ApiError(400 , "User dont exist in the participants list");
    }

    event.participants.splice(index,1);
    await event.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "User removed successfully from the list"
        )
    )
})

const getEventById = asyncHandler(async(req,res)=>{
    const {eventId} = req.params;
    if(!eventId){
        throw new ApiError(400 , "Event id is required")
    }

    const event = await Event.findById(eventId);
    if(!event){
        throw new ApiError(400 , "Event dont exist");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            event,
            "Event fetched successfully"
        )
    )
})


const getAllEvents = asyncHandler(async(req,res)=>{
    const events = await Event.find({});
    if(!events){
        throw new ApiError(500 , "Error while fetching list of events from the backend")
    }
    return res.status(200).json(
        new ApiResponse(
            200 ,
            events,
            "ALl events fetched successfully"
        )
    )
})

export {
    createLocalEvent,
    deleteEvent,
    addParticipant,
    removeParticipant,
    getEventById,
    getAllEvents
}