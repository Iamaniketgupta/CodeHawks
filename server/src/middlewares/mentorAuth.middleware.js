import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import Mentor  from "../models/mentor.model.js";

export const verifyMentorJwt = asyncHandler(async( req , res, next)=>{
    try {
        // console.log(req.cookies.accessToken);
        const token = req.cookies.accessToken || req.header("Authorization")?.replace("Bearer" , "");
    
        if(!token){
            throw new ApiError(401, "Unauthorized request");
        }
    
        const decodedToken = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET);

        console.log(decodedToken);
    
        const  mentor = await Mentor.findById(decodedToken).select("-password -refreshToken");

        console.log(mentor)
    
        if(!mentor){
            throw new ApiError(401, "Invalid token");
        }
    
        req.mentor = mentor;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }

})