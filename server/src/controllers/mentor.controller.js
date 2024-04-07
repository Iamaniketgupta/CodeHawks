import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { uploadToCloudinary } from "../utils/cloudinary.js"
import Jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/apiResponse.js";
import Mentor from "../models/mentor.model.js";
import { isValidObjectId } from "mongoose";
import Timeslot from "../models/timeslot.model.js";
import { Pricing } from "../models/pricing.model.js";


const options = {
    httpOnly: true,
    secure: true
}

const registerMentor = asyncHandler(async (req, res) => {

    const { fullName, email, password, country, state, languages, experience } = req.body;

    const isUserExist = await Mentor.findOne({ email });

    if (isUserExist) {
        throw new ApiError(409, 'User Already Exist')
    }

    const userRegister = await Mentor.create({
        fullName: fullName,
        email: email,
        password: password,
        country: country,
        state: state,
        languages: languages,
        experience: experience
    });

    if (!userRegister) {
        res.status(500).json({
            message: "Something Went wrong Try again!"
        });
    }

    res.status(200).json({
        message: "Registered Successfully"
    });

});

const loginMentor = asyncHandler(async (req, res) => {

    const { email, password } = req.body;
    //validation of the required values
    if (!email) throw new ApiError(400, "email is required");

    const ValidUser = await Mentor.findOne({
        email
    });

    if (!ValidUser) 
    res.status(404).json({
        data:{},
        message: "User Not Found"
    });

    if (!password) throw new ApiError(400, "Password is required");

    if (!await ValidUser.isPasswordCorrect(password)) {
        res.status(401).json({
            data:{},
            message: "Invalid email or password"
        });
    }

    const accessToken = await ValidUser.generateAccessToken();
    // Update user document with refresh token
    const refreshToken = await ValidUser.generateRefreshToken();
    const rtoken = await Mentor.findByIdAndUpdate(ValidUser._id, { refreshToken: refreshToken });
    if (!rtoken)
        throw new ApiError(500, "something went wrong");

        

        const loggedInUser = await Mentor.findById(ValidUser._id).select("-password -refreshToken");

    return res.status(200).cookie("accessToken", accessToken)
        .cookie("refreshToken", rtoken.refreshToken).json(
            new ApiResponse(
                200 ,
                {
                    user:loggedInUser,
                    accessToken,
                    refreshToken
                },
                "user logged in successfully"
            )
        );

});

const logOutMentor = asyncHandler(async (req, res) => {
    Mentor.findByIdAndUpdate(req.mentor._id, {
        $set: {
            refreshToken: ''
        }
    });

    return res.status(200).clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json({
            message: "Logged Out Success"
        });
});

const refreshMentorAccessToken = asyncHandler(async (req, res) => {
    const refereshToken = req.cookies.referId || req.body.referId
    console.log("from user controller ", refereshToken)

    if (!refereshToken) {
        throw new ApiError(401, "Session Expired");
    }
    const decodedToken = Jwt.verify(refereshToken, REFRESH_TOKEN_SECRET);
    const user = await Mentor.findById(decodedToken?._id);
    if (!user) {
        throw new ApiError(401, "Invalid Refresh Token");
    }

    if (user.refreshToken !== refereshToken) {
        throw new ApiError(401, "Refresh Token is Expired");
    }

    const newAccessToken = await user.generateAccessToken();
    // Update Mentor document with refresh token
    const newRefreshToken = await user.generateRefreshToken();
    const rtoken = await Mentor.findByIdAndUpdate(user?._id, { refreshToken: newRefreshToken });
    if (!rtoken)
        throw new ApiError(500, "something went wrong");

    return res.status(200).cookie("menauthId", newAccessToken, options)
        .cookie("referId", rtoken.newRefreshToken, options).json({
            message: "Access Token Refreshed"
        });
});

const updateMentorProfile = asyncHandler(async (req, res) => {
    const { fullName, country, state, interests, experience, profession,description, linkedin, pricing, workExp , status } = req.body;

    // console.log(req.body)
    const userId = req.mentor._id;
    const user = await Mentor.findById(userId);
    if (!user) {
        throw new ApiError("User not found");
    }

    const updatedFields = {
        fullName: fullName || user.fullName,
        profession: profession || user.profession,
        description: description || user.description,
        country: country || user.country,
        state: state || user.state,
        interests: interests || user.interests,
        experience: experience || user.experience,
        linkedin: linkedin || user.linkedin,
        pricing: pricing || user.pricing,
        workExp: workExp || user.workExp,
        status : status || user.status
    };
    // console.log(updatedFields)

    const updatedUser = await Mentor.findByIdAndUpdate(userId, updatedFields, { new: true });

    console.log(updatedUser)
    return res.status(200).json(
        new ApiResponse(
            200,
            updatedUser,
            "Mentor updated successfully"
        )
    );
});


const updateMentorAvatar = asyncHandler(async (req, res) => {
    const avatarLocalPath = req.file?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "avatar file is missing");
    }

    const avatar = await uploadToCloudinary(avatarLocalPath);

    if (!avatar.url) {
        throw new ApiError(
            400, "Error while uploading avatar"
        )
    }

    const user = await Mentor.findByIdAndUpdate(
        req.mentor._id,
        {
            $set: {
                avatar: avatar.url
            }
        },
        { new: true }
    );

    if (!user) {
        throw new ApiError(
            400, "Error while uploading avatar"
        )
    }

    return res.status(200).json(
        new ApiResponse(200, user, "Avatar image uploaded successfully")
    )
});


const getMentorById = asyncHandler(async(req,res)=>{
    const {mentorId} = req.body;
    if(!mentorId){
        throw new ApiError(400 , "Mentor id is required");
    }

    const isMentorIdValid = isValidObjectId(mentorId);
    if(!isMentorIdValid){
        throw new ApiError(400 , "mentor id is not valid");
    }


    const mentor = await Mentor.findById(mentorId).select("-password -refreshToken");

    if(!mentor){
        throw new ApiError(500 , "Error while fetchinf mentor from the db");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            mentor ,
            "mentor fetched successfully"
        )
    )
});


const getMentorAllSlots = asyncHandler(async (req, res) => {
    const mentorId = req.mentor._id;
// console.log(mentorId)
    if (!mentorId) {
        throw new ApiError(404,"Failed to get data");
    }
    const timeSlots = await Timeslot.find({mentor:mentorId}).select("-mentor");
    
    if (!timeSlots || timeSlots.length === 0) {
        res.status(201).json({
            data:[],
            message:"No Slots Available"
        });
    }

    else{
    res.status(200).json({
        data: timeSlots,
    })}
}
);


//  Pricing controllers

const createPrice = asyncHandler(async (req, res) => {
    const mentorId = req.mentor._id;

    // Check if mentor already has pricing
    const mentor = await Mentor.findById(mentorId).populate('pricing');
    if (mentor.pricing) {
        return res.status(400).json({ message: 'Mentor already has pricing. Delete it first to create a new one.' });
    }

    const { mentorshipPrice, targetInterest, specialties } = req.body;

    const pricing = new Pricing({
        mentor: mentorId,
        mentorshipPrice,
        targetInterest,
        specialties
    });

    await pricing.save();

    // Associate pricing with mentor
    mentor.pricing = pricing._id;
    await mentor.save();

    res.status(201).json({ message: 'Pricing created successfully', pricing });
});


// Fetch Pricing
const getPricing = asyncHandler(async (req, res) => {
    const mentorId = req.params.mentorId;

    const mentor = await Mentor.findById(mentorId).populate('pricing');

    if (!mentor || !mentor.pricing) {
        return res.status(404).json({ message: 'No pricing found for this mentor' });
    }

    res.status(200).json({ pricing: mentor.pricing });
});

// Delete pricing
const deletePricing = asyncHandler(async (req, res) => {
    const priceId = req.params.priceId;
    const pricing = await Pricing.findById(priceId);
    if (!pricing) {
        return res.status(404).json({ message: 'No pricing found' });
    }

    const mentor = await Mentor.findOneAndUpdate(
        { pricing: priceId }, 
        { $unset: { pricing: 1 } }, 
        { new: true } 
    );

    await Pricing.deleteOne({ _id: priceId });

    res.status(200).json({ message: 'Pricing deleted successfully' });
});




export {
    registerMentor,
    loginMentor,
    logOutMentor,
    updateMentorProfile,
    updateMentorAvatar,
    refreshMentorAccessToken,
    getMentorById,
    getMentorAllSlots,
    createPrice, getPricing, deletePricing
}