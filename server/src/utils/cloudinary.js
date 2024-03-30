import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs'
import { ApiError } from './ApiError.js';



cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: '852652549314759', 
    api_secret: process.env.CLOUDINARY_API_SECRET 
  });


const uploadToCloudinary = async (localFilepath)=>{
    try {
        console.log(process.env.CLOUDINARY_API_SECRET)
        if(!localFilepath) return null;
        const response = await cloudinary.uploader.upload(localFilepath,{
            resource_type:"auto"
        })
        //file has been succesfully uploaded
        // console.log("uploaded on cloudinary succesfully ", response);
        fs.unlinkSync(localFilepath);
        return response;
    } catch (error) {
        console.log(error)
        fs.unlinkSync(localFilepath)
        return null;
    }
}


const deleteFromCloudinary = async(publicId) => {
    try {
        // console.log(typeof publicId);
        const res = await cloudinary.uploader.destroy(String(publicId));
        return res;
            
    } catch (error) {
        console.log(error)
        throw new ApiError(500 , "something went wrong while deleting file from cloudinary ");
    }
}


const deleteVideoFromCloudinary = async(publicId) => {
    try {

        //  console.log(publicId)
        // console.log(typeof publicId);
        
        const res = await cloudinary.uploader
        .destroy(publicId, {resource_type: 'video'});;
        console.log(res)

        return res;
            
    } catch (error) {
        console.log(error)
        throw new ApiError(500 , "something went wrong while deleting file from cloudinary ");
    }
}



const publicId = async (url) => {
    try {
        const arr = url.split("/");
        const item = arr[arr.length -1];
        const arr2 = item.split(".");
        const res = arr2[0];
        return res;
    } catch (error) {
        throw new ApiError(500, "Something went wrong in getting public id");
    }
}



export {uploadToCloudinary , deleteFromCloudinary , publicId , deleteVideoFromCloudinary}