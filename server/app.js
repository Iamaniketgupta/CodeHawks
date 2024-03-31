import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors'
const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true
}))

// all middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"))
app.use(cookieParser());


// various  routes 
import mentorRouter from './src/routes/mentor.routes.js'
import menteeRouter from './src/routes/mentee.route.js'
import taskRouter from "./src/routes/task.routes.js";

app.use("/api/v1/mentor" , mentorRouter);
app.use("/api/v1/mentee" , menteeRouter);
app.use("/api/v1/task" , taskRouter);





export {app} 

