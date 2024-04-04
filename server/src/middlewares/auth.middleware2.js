import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { Mentee } from "../models/mentee.model.js";

export const verifyJwt = asyncHandler(async( req , res, next)=>{
    try {
        // console.log(req.cookies.accessToken);
        const token = req.cookies.accessToken || req.header("Authorization")?.replace("Bearer" , "");
    
        if(!token){
            res.status(402).json({
                data:null,
                message:"Please Login as Mentee"
            });
        }
    
        const decodedToken = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET);

        console.log(decodedToken);
    
        const  user = await Mentee.findById(decodedToken).select("-password -refreshToken");

        console.log(user)
    
        if(!user){
            throw new ApiError(401, "Invalid token");
        }
    
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }

})