import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors'
const app = express()

app.use(cors({
    
  origin: 'https://code-hawks.vercel.app',
  methods: ['GET', 'POST'],
  credentials: true,  // enable set cookie
}))

// all middlewares
app.use(express.json())
app.use(express.urlencoded());
app.use(express.static("public"))
app.use(cookieParser());


// various  routes 
import userRouter from './src/routes/user.routes.js'
import teamRouter from './src/routes/team.routes.js'
import eventRouter from './src/routes/event.route.js'

app.use("/api/v1/users" , userRouter);
app.use("/api/v1/teams" , teamRouter);
app.use("/api/v1/events" , eventRouter);




export {app} 

