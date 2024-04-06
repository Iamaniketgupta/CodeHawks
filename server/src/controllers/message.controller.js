import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Message from "../models/message.model.js";
import { isValidObjectId } from "mongoose";
import Mentor from "../models/mentor.model.js";
import { Mentee } from "../models/mentee.model.js";



const getAllMessagesByUserId = asyncHandler(async(req,res)=>{
    const {userId , personId} = req.body;
    if(!userId || !personId){
        throw new ApiError(400 , "User id is required");
    }

    const isUserIdValid = isValidObjectId(userId);
    if(!isUserIdValid){
        throw new ApiError(400 , "User id is not valid");
    }


    const isPersonIdValid = isValidObjectId(personId);
    if(!isPersonIdValid){
        throw new ApiError(400 , "Person id not valid");
    }

    const messages = await Message.find({
        $or: [
            { senderId: userId, recipientId: personId },
            { senderId: personId, recipientId: userId }
        ]
    }).sort({ createdAt: 1 }); // Sort by createdAt field in ascending order

    if(!messages){
        throw new ApiError(500 , "Some error occur while getting the messaged from database")
    }


    return res.status(200).json(
        new ApiResponse(
            200,
            messages,
            "Messages fetched successfully"
        )
    )

})

const deleteMessagesByUserId = asyncHandler(async(req,res)=>{
    const {userId , personId} = req.body;
    if(!userId && !personId){
        throw new ApiError(400 , "User id and person id is required");
    }

    const isUserIdValid = isValidObjectId(userId);
    if(!isUserIdValid){
        throw new ApiError(400 , "User id is not valid");
    }


    const isPersonIdValid = isValidObjectId(personId);
    if(!isPersonIdValid){
        throw new ApiError(400 , "Person id not valid");
    }
    
    const messages = await Message.deleteMany({
        $or: [
            { senderId: userId, recipientId: personId },
            { senderId: personId, recipientId: userId }
        ]
    })

    if(!messages){
        throw new ApiError(500 , "Error while deleting the messages from db");
    }


    return res.status(200).json(
        new ApiResponse(
            200,
            messages,
            "Messages deleted successfully"
        )
    )

})

const getUsersWithChatHistory = asyncHandler(async(req,res)=>{
    const {id} = req.body;
    if(!id){
        throw new ApiError(400 , "Id not found");
    }

    const isvalid = isValidObjectId(id);
    if(!isvalid){
        throw new ApiError(400 , "Id not valid")


    }

    
        // Find all distinct users who have exchanged messages with the current user
        const sentMessages = await Message.distinct('recipientId', { senderId: id });
        const receivedMessages = await Message.distinct('senderId', { recipientId: id });
        const distinctUsers = [...new Set([...sentMessages, ...receivedMessages])];

        const usersWithChatHistory = await Promise.all(distinctUsers.map(async (id) => {
            const mentor = await Mentor.findById(id);
            const mentee = await Mentee.findById(id);
            return mentor || mentee;
        }));

    

    res.status(200).json({ success: true, usersWithChatHistory: usersWithChatHistory });

})


const getPersonById = asyncHandler(async(req,res)=>{
    const  {id} = req.body;
    if(!id){
        throw new ApiError(400 , "Id not found");
    } 

    const mentee = await Mentee.findById(id).select("fullName avatar");
    if(!mentee){
        const mentor = await Mentor.findById(id).select("fullName avatar");
        if(!mentor){
            throw new ApiError(500 , "User not found");
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                mentor,
                "user found successfully"
            )
        )
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            mentee,
            "user found successfully"
        )
    )


})

export {
    getAllMessagesByUserId,
    deleteMessagesByUserId,
    getUsersWithChatHistory,
    getPersonById

}