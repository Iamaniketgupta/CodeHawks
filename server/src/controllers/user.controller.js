import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

import {uploadToCloudinary} from '../utils/cloudinary.js'


const generateAccessAndRefreshToken = async(userId)=>{
    try {
        const user = await User.findById(userId);
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


const exampleFunc = asyncHandler(async(req,res)=>{

    const data = "something";

    return res.status(200).json(
        new ApiResponse(
            200,
            data,
            "data fetched successfully"
        )
    )
})


const signup = asyncHandler(async(req,res)=>{
    const {fullName , phoneNo , email ,  password , gender , age , sportsInterest , location  , skillLevels , coordinates} = req.body;

    if(!(fullName && phoneNo && email && password   && location  && coordinates)){
        throw new ApiError(400 , "All fields are required");
    }

    // if(req.file){
    //     if(!req.file.avatar){
    //         throw new ApiError(400 , "avatar is required");
    //     }
    // }
    
    // const avatarLocalPath = req.file?.path;

    // if(!avatarLocalPath){
    //     throw new ApiError(400 , "avatar file is missing");
    // }

    // console.log(avatarLocalPath)

    // const avatar = await uploadToCloudinary(avatarLocalPath);
    // // console.log(avatar)
    // if(!avatar){
    //     throw new ApiError(
    //         400 , "Error while uploading avatar"
    //     )
    // }
    
    const user = await User.create(
        {
            fullName,
            phoneNo,
            email,
            password,
            location,
            coordinates
            // avatar : avatar.url
        }
    );

    if(!user){
        throw new ApiError(500 , "Something wrong happend while creating the user");
    }

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if(!createdUser){
        throw new ApiError(500 , "something went wrong while registering");
    }

    
    const {accessToken , refreshToken} = await generateAccessAndRefreshToken(createdUser._id);
    // console.log({accessToken , refreshToken});


    return res
    .status(200)
    .cookie("accessToken",accessToken )
    .cookie("refreshToken" , refreshToken )
    .json(
        new ApiResponse(
            200 ,
            {
                user:createdUser,
                accessToken,
                refreshToken
            },
            "user registered in successfully"
        )
    )
})


const login = asyncHandler(async(req,res)=>{
    const {email , phoneNo , password} = req.body;
    if(!email && !phoneNo){
        throw new ApiError(400 , "email or phone no. is required");
    }

    const user = await User.findOne({
        $or:[{ email } , { phoneNo }]
    });

    if(!user){
        throw new ApiError(404 , "User doesnot exist");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if(!isPasswordValid){
        throw new ApiError(404 , "Password not correct");
    }

    
    const {accessToken , refreshToken} = await generateAccessAndRefreshToken(user._id);
    // console.log({accessToken , refreshToken});

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

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
    const user = await User.findByIdAndUpdate(
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

    // const option = {
    //     httpOnly : true,
    //     // secure:true
    // };

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


const recommendUsers = asyncHandler(async(req,res)=>{

    const userId= req.user?.id; 
    const user = await User.findById(userId);

    if (!user) {
      // Handle the case where the user is not found
      throw new ApiError(400 , "User dont exist");
    }

    // Get the user's normalized sports interest
    const userSportsInterest = user.sportsInterest;

    // Find other users with at least one common word in their interests
    const recommendedUsers = await User.find({
      _id: { $ne: userId }, // Exclude the current user
      sportsInterest: {
        $ne: null, // Exclude users with null interests
        $regex: new RegExp(`\\b(?:${userSportsInterest})\\b`, 'i'),
      },
    });

    if(!recommendedUsers){
        throw new ApiError(500 , "Error while fetching recommended users from the database");
    }


    return res.status(200).json(
        new ApiResponse(
            200,
            recommendedUsers,
            "Recommended users fetched succesfully"
        )
    )
})


const editProfile = asyncHandler(async(req,res)=>{
    const userId = req.user?.id;
    const user = await User.findById(userId);
    const {fullName  , age  , sportsInterest , location , preferredSportActivities , skillLevels } = req.body;

    const updatedUser = await User.findByIdAndUpdate(userId , {
        fullName : fullName || user.fullName,
        age : age || user.age,
        sportsInterest : sportsInterest || user.sportsInterest,
        location : location || user.location ,
        preferredSportActivities : preferredSportActivities || user.preferredSportActivities ,
        skillLevels : skillLevels || user.skillLevels,
    },{
        new:true
    });

    if(!updatedUser){
        throw new ApiError(500  , "Something went wrong while updating user ");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            updatedUser,
            "User details updated successfully"
        )
    )
})

const toggleFollow = asyncHandler(async(req,res)=>{
    const {userId} = req.params;
    const followerId = req.user?._id;

    console.log(userId , followerId)
    if(!userId){
        throw new ApiError(400 , "UserId is requried");
    }

    const follower = await User.findById(followerId);
    if(!follower){
        throw new ApiError(400 , "User (Followe) dont exist");
    }

    const user = await User.findById(userId);
    if(!user){
        throw new ApiError(400 , "User dont exist");
    }

    const container  = [
        ...follower.following
    ];

    let bool = false;


    container.forEach(element => {
        if(element.equals(user._id)) bool = true;
    });


    if(bool){
        const index = follower.following.indexOf(user._id);
        follower.following.splice(index , 1);

        const index2 = user.followers.indexOf(followerId);
        user.followers.splice(index2 , 1);
        await follower.save();
        await user.save();

    }else{
        follower.following.push(user._id);
        user.followers.push(followerId);
        await follower.save();
        await user.save();
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Follow toggled Successfully"
        )
    )
    
})

const findPeople = asyncHandler(async(req,res)=>{
    const {searchQuery} = req.query;
    if(!searchQuery){
        throw new ApiError("search query is required");
    }

    
    const regexPattern = new RegExp(`.*${searchQuery}.*`, 'i');

    const userList = await User.find(
        {
            fullName:regexPattern
        }
    );

    if(!userList){
        throw new ApiError(500 ,"Error while fetching userlist from the db");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            userList,
            "User list fetched successfully"
        )
    )

})

const getCurrentUser = asyncHandler(async(req,res)=>{
    return res.status(200).json(
        new ApiResponse(
            200,
            req.user,
            "Fetched current user successfully"
        )
    )
})


const getAllUsers = asyncHandler(async(req,res)=>{
    const allUsers = await User.find({});
    if(!allUsers){
        throw new ApiError(500 , "Error while fetching all users");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            allUsers,
            "All users fetched successfully"
        )
    )
})


export {
    exampleFunc,
    signup,
    login,
    logoutUser,
    recommendUsers,
    editProfile,
    toggleFollow,
    findPeople,
    getCurrentUser,
    getAllUsers
}