import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { uploadToCloudinary } from "../utils/cloudinary.js"
import Jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/apiResponse.js";
import Mentor from "../models/mentor.model.js";


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

    if (!ValidUser) throw new ApiError(404, "User Does not exist");
    if (!password) throw new ApiError(400, "Password is required");

    if (!await ValidUser.isPasswordCorrect(password)) {
        res.status(401).json({
            message: "Invalid email or password"
        });
    }

    const accessToken = await ValidUser.generateAccessToken();
    // Update user document with refresh token
    const refreshToken = await ValidUser.generateRefreshToken();
    const rtoken = await User.findByIdAndUpdate(ValidUser._id, { refreshToken: refreshToken });
    if (!rtoken)
        throw new ApiError(500, "something went wrong");

    return res.status(200).cookie("menauthId", accessToken, options)
        .cookie("referId", rtoken.refreshToken, options).json({
            message: "Logged in Success"
        });

});

const logOutMentor = asyncHandler(async (req, res) => {
    Mentor.findByIdAndUpdate(req.mentor._id, {
        $set: {
            refreshToken: ''
        }
    });

    return res.status(200).clearCookie("menauthId", options)
        .clearCookie("referId", options)
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
    const { fullName, country, state, interests, experience, linkedin, pricing, workExp } = req.body;

    const userId = req.mentor._id;
    const user = await Mentor.findById(userId);
    if (!user) {
        throw new ApiError("User not found");
    }

    const updatedFields = {
        fullName: fullName || user.fullName,
        country: country || user.country,
        state: state || user.state,
        interests: interests || user.interests,
        experience: experience || user.experience,
        linkedin: linkedin || user.linkedin,
        pricing: pricing || user.pricing,
        workExp: workExp || user.workExp
    };

    const updatedUser = await Mentor.findByIdAndUpdate(userId, updatedFields, { new: true });

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





export {
    registerMentor,
    loginMentor,
    logOutMentor,
    updateMentorProfile,
    updateMentorAvatar,
    refreshMentorAccessToken,
}