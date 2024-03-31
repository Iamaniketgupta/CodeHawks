import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/apiError.js";
import { uploadOnCloudianry } from "../utils/cloudinary.js"
import Jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/apiResponse.js";

const registerUser = asyncHandler(async (req, res) => {

    const { fullName, email, username, password } = req.body;
    
    if (
        [fullName, email, username, password].some((item) => item?.trim() === "")
    ) {
        throw new ApiError(400, "All Fields are required");
    }

    //validation of the existing user
    const isUserExist = await User.findOne({email});

    if (isUserExist) {
        throw new ApiError(409, 'User Already Exist')
    }

    //using multer includes files to access
    const avatarLocalPath = req.files?.avatar[0]?.path

    // console.log(avatarLocalPath)
    // console.log(coverLocalPath)

    const avatar = await uploadOnCloudianry(avatarLocalPath);

    // console.log(avatar)
    // console.log(cover)


    const userRegister = await User.create({
        fullName: fullName,
        avatar: avatar?.url || "",
        email: email,
        username: username,
        password: password
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
