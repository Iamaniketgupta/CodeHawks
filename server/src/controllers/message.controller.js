import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Message from "../models/message.model.js";
import { isValidObjectId } from "mongoose";



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
    if(!userId || !personId){
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

export {
    getAllMessagesByUserId,
    deleteMessagesByUserId

}