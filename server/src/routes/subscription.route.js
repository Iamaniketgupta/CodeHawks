import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware2.js";

import {  getMenteeSubscriptions, getUserSubscribers } from "../controllers/subscription.controller.js";

import { verifyMentorJwt } from "../middlewares/mentorAuth.middleware.js";
const router = Router();


router.route('/getUserSubscribers').post( getUserSubscribers);
router.route('/getMenteeSubscriptions').get( getMenteeSubscriptions);

export default router;
