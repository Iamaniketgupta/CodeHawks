import mongoose from "mongoose";
import { DB_NAME } from "../../constants.js";

const connectDB  = async ()=>{
    try {
        const connectionInstance = await mongoose.connect(`mongodb://127.0.0.1:27017/${DB_NAME}`);
    
    console.log(`Mongodb connected with host ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("SRC :: DB :: index.js :: mongodb connection failed " , error);
    }
}

export default connectDB;