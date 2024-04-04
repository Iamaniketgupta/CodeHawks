import Mentor from "../models/mentor.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getAllMentors = asyncHandler(
    async(req,res)=>{
        const allMentors = await Mentor.find({}).select("-password -email -refreshToken");
        if(!allMentors ||allMentors.length===0){
            res.status(404).json({
                data:{},
                message:"Not Found"
            });
        }
        res.status(200).json({
            data:allMentors,
            message:"Fetched Success"
        })
    }
)

export {
    getAllMentors
}