import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware2.js";
import { verifyMentorJwt } from '../middlewares/mentorAuth.middleware.js';

import { createMeeting, deleteMeeting, getAllMeetings, getMenteeMeetings } from "../controllers/meeting.controller.js";

const router = Router();

router.route("/allMenteeMeetings").get(verifyJwt,getMenteeMeetings);
router.route("/allMentorMeetings").get(verifyMentorJwt,getAllMeetings);
router.route("/delete/:meetingId").delete(verifyMentorJwt,deleteMeeting);
router.route("/create/new").post(verifyMentorJwt,createMeeting);


export default router;