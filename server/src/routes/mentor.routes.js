import { Router } from "express";
import { logOutMentor, loginMentor,  registerMentor, updateMentorAvatar, updateMentorProfile,getMentorById, getMentorAllSlots } from "../controllers/mentor.controller.js";
import { verifyMentorJwt } from "../middlewares/mentorAuth.middleware.js";
import { uploadImage } from "../middlewares/multer.middleware.js";

const mentorRouter = Router();


mentorRouter.route('/signup').post(registerMentor);
mentorRouter.route('/login').post(loginMentor);
mentorRouter.route('/logout').post(verifyMentorJwt , logOutMentor);
mentorRouter.route('/editProfile').post(verifyMentorJwt , updateMentorProfile);
mentorRouter.route('/updateMentorAvatar').post(verifyMentorJwt, uploadImage.single("avatar") , updateMentorAvatar);
mentorRouter.route('/getAllSlots').get(verifyMentorJwt , getMentorAllSlots);
mentorRouter.route("/getMentorById").post(getMentorById)
 
export default mentorRouter;
 