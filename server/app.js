import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors'
const app = express()

app.use(cors({
    origin: 'https://thementorhub.vercel.app',
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
import timeslotRouter  from './src/routes/timeslot.route.js'
import messageRouter from './src/routes/message.route.js'
import subscriptionRouter from './src/routes/subscription.route.js'
import generalRoutes from './src/routes/generalRoutes.js'
import stripePayment from './src/routes/stripePayment.route.js'
import meeting from './src/routes/meeting.routes.js'

app.use("/api/v1/mentor" , mentorRouter);
app.use("/api/v1/mentee" , menteeRouter);
app.use("/api/v1/task" , taskRouter);
app.use("/api/v1/timeslot" , timeslotRouter);
app.use("/api/v1/message" , messageRouter);
app.use("/api/v1/subscription" , subscriptionRouter);
app.use("/api/v1" , generalRoutes);
app.use("/api/v1/meeting" ,meeting );
app.use("/api/v1/payment" , stripePayment);






export {app} 

