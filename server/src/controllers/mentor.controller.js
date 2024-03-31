import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/apiError.js";
import { uploadOnCloudianry } from "../utils/cloudinary.js"
import Jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/apiResponse.js";
import Mentor from "../models/mentor.model.js";


const options = {
    httpOnly: true,
    secure: true
}

const registerUser = asyncHandler(async (req, res) => {

    const { fullName, email, password, country, state, languages, experience } = req.body;

    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
        throw new ApiError(409, 'User Already Exist')
    }

    const avatarLocalPath = req.files?.avatar[0]?.path

    const avatar = await uploadOnCloudianry(avatarLocalPath);


    const userRegister = await Mentor.create({
        fullName: fullName,
        avatar: avatar?.url || "",
        email: email,
        username: username,
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

const loginUser = asyncHandler(async (req, res) => {

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

const logOutUser = asyncHandler(async (req, res) => {
    Mentor.findByIdAndUpdate(req.user._id, {
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

const refreshAccessToken = asyncHandler(async (req, res) => {
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


export{
    registerUser,
    loginUser,
    logOutUser,
    refreshAccessToken
}