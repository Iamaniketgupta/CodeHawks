import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware2.js";


import {  getUserSubscribers , getMenteeSubscriptions } from "../controllers/subscription.controller.js";

import {  getMenteeSubscriptions, getUserSubscribers } from "../controllers/subscription.controller.js";

import { verifyMentorJwt } from "../middlewares/mentorAuth.middleware.js";
const router = Router();


router.route('/getUserSubscribers').post( verifyMentorJwt , getUserSubscribers);
router.route('/getMenteeSubscriptions').post(verifyJwt , getMenteeSubscriptions);


// import { getSubscription } from "../controllers/subscription.controller.js";



// router.route('/getSubscription').post(verifyJwt , getSubscription);


export default router;