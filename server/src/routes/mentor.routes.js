import { Router } from "express";
import { logOutMentor, loginMentor,  registerMentor, updateMentorAvatar, updateMentorProfile } from "../controllers/mentor.controller.js";
import { verifyMentorJwt } from "../middlewares/mentorAuth.middleware.js";

const mentorRouter = Router();


mentorRouter.route('/signup').post(registerMentor);
mentorRouter.route('/login').post(loginMentor);
mentorRouter.route('/logout').post(verifyMentorJwt , logOutMentor);
mentorRouter.route('/editProfile').post(verifyMentorJwt , updateMentorProfile);
mentorRouter.route('/updateMentorAvatar').post(verifyMentorJwt , updateMentorAvatar);
 
export default mentorRouter;
 