import { isValidObjectId } from 'mongoose';
import {Mentee} from '../models/mentee.model.js'
import Mentor from '../models/mentor.model.js';
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


import {uploadToCloudinary} from '../utils/cloudinary.js'


const generateAccessAndRefreshToken = async(userId)=>{
    try {
        const user = await Mentee.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        // console.log("accesstoken : ",accessToken );

        user.refreshToken = refreshToken;
        await user.save({
            validateBeforeSave:false
        });

        return {accessToken , refreshToken};

    } catch (error) {
        throw new ApiError(500 , "Someting went wrong while generating access and refresh tokens");
    }
}



const signup = asyncHandler(async(req,res ,next)=>{
    const {fullName  , email ,  password  , country , state   ,experience , interests , languages  } = req.body;

    if(!(fullName  && email && password && country && state   && experience && interests && languages)){
        throw new ApiError(400 , "All fields are required");
    }

    // console.log(languages)
    // console.log(interests)

    const user = await Mentee.findOne({
        email:email
    });

    if(user){
        throw new ApiError("User with email already exist");
    }

    const mentee = await Mentee.create(
        {
            fullName,
            email,
            password,
            country,
            state,
            experience,
            interests,
            languages
        }
    );

    if(!mentee){
        throw new ApiError(500 , "Something wrong happend while creating the user");
    }

    const createdUser = await Mentee.findById(mentee._id).select(
        "-password -refreshToken"
    );

    if(!createdUser){
        throw new ApiError(500 , "something went wrong while registering");
    } 
    
    return res.status(200).json(
        new ApiResponse(
            200,
            createdUser,
            "Mentee registered successfully"
        )
    )

})


const login = asyncHandler(async(req,res)=>{
    const {email , password} = req.body;
    if(!email ){
        throw new ApiError(400 , "email  is required");
    }

    const user = await Mentee.findOne({
        email
    });

    if(!user){
        throw new ApiError(404 , "User does not exist");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if(!isPasswordValid){
        throw new ApiError(404 , "Password not correct");
    }

    
    const {accessToken , refreshToken} = await generateAccessAndRefreshToken(user._id);
    // console.log({accessToken , refreshToken});

    const loggedInUser = await Mentee.findById(user._id).select("-password -refreshToken");

    return res
    .status(200)
    .cookie("accessToken",accessToken )
    .cookie("refreshToken" , refreshToken )
    .json(
        new ApiResponse(
            200 ,
            {
                user:loggedInUser,
                accessToken,
                refreshToken
            },
            "user logged in successfully"
        )
    )

})


const logoutUser = asyncHandler(async(req,res)=>{
    const user = await Mentee.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                refreshToken:undefined
            },
        },
        {
            new:true
        }
    )

    return res.status(200)
    .clearCookie("accessToken" )
    .clearCookie("refreshToken" )
    .json(
        new ApiResponse(
            200 ,
            {},
            "User"
        )
    );
})


const addMentorToBookmark = asyncHandler(async (req, res) => {
    const { mentorId } = req.body;
    if (!mentorId) {
        throw new ApiError(400, "Mentor id is required");
    }

    const mentor = await Mentor.findById(mentorId);
    if (!mentor) {
        throw new ApiError("Mentor doesn't exist");
    }

    const mentee = await Mentee.findById(req.user._id);
    const index = mentee.bookmarked_mentors.indexOf(mentorId);

    let action;
    let message;
    if (index === -1) {
        mentee.bookmarked_mentors.push(mentorId);
        action = "added";
        message = "Mentor added successfully";
    } else {
        mentee.bookmarked_mentors.splice(index, 1);
        action = "removed";
        message = "Mentor removed successfully";
    }

    await mentee.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            `Mentor ${action} successfully: ${message}`
        )
    );
});


const removeMentorFromBookmark = asyncHandler(async (req, res) => {
    const { mentorId } = req.body;
    if (!mentorId) {
        throw new ApiError("Mentor id is required");
    }

    const mentor = await Mentor.findById(mentorId);
    // console.log(mentor)
    if (!mentor) {
        throw new ApiError("Mentor doesn't exist");
    }

    const mentee = await Mentee.findById(req.user._id);
    if (!mentee) {
        throw new ApiError(401,"unAuthorized");
    }

    mentee.bookmarked_mentors = mentor.bookmarked_mentors?.filter(item => item !== mentorId);

    await mentee.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Mentor removed successfully"
        )
    );
});


const getMenteeBookmarks = async (req, res) => {
    try {
        const menteeId = req.user._id; 
        const mentee = await Mentee.findById(menteeId).populate('bookmarked_mentors', '-password -refreshToken -email');
        if (!mentee) {
            throw new Error("Mentee not found");
        }
        const bookmarks = mentee.bookmarked_mentors.map(mentor => ({
            id: mentor._id,
            fullName: mentor.fullName,
        }));

        res.status(200).json({
            success: true,
            bookmarks: bookmarks
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



const updateMenteeAvatar = asyncHandler(async(req,res)=>{
    const avatarLocalPath = req.file?.path;

    if(!avatarLocalPath){
        throw new ApiError(400 , "avatar file is missing");
    }

    const avatar = await uploadToCloudinary(avatarLocalPath);

    if(!avatar.url){
        throw new ApiError(
            400 , "Error while uploading avatar"
        )
    }

    const user = await Mentee.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                avatar : avatar.url
            }
        },
        {new:true}
    );

    return res.status(200).json(
        new ApiResponse(200 , user , "Avatar image uploaded successfully")
    )
})



const updateMenteeProfile = asyncHandler(async(req,res)=>{
    const {fullName , country , state , interests  , experience , linkedin} = req.body;

    const userId = await req.user._id;
    const user = await Mentee.findById(userId);
    if(!user){
        throw new ApiError("User not found");
    }

    const updatedUser = await Mentee.findByIdAndUpdate(userId , {
        fullName:fullName || user.fullName,
        country : country || user.country,
        state:state || user.state,
        interests : interests || user.interests,
        experience : experience || user.experience,
        linkedin : linkedin || user.linkedin
    } , {
        new:true
    });
    
    return res.status(200).json(
        new ApiResponse(
            200 ,
            updatedUser,
            "Mentee updated succesfully"
        )
    )
    
})



const getMenteeById = asyncHandler(async(req,res)=>{
    const {menteeId} = req.body;
    if(!menteeId){
        throw new ApiError(400 , "menteeId id is required");
    }

    
    const isMentorIdValid = isValidObjectId(menteeId);
    if(!isMentorIdValid){
        throw new ApiError(400 , "menteeId id is not valid");
    }


    const mentee = await Mentee.findById(menteeId).select("-password -refreshToken");

    if(!mentee){
        throw new ApiError(500 , "Error while fetching mentor from the db");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            mentee ,
            "mentor fetched successfully"
        )
    )
});



export 
{
    signup,
    login,
    logoutUser,
    addMentorToBookmark,
    removeMentorFromBookmark,
    updateMenteeAvatar,
    updateMenteeProfile,
    getMenteeBookmarks,
    getMenteeById
}