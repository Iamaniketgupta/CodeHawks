import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware2.js";

import { getSubscription , getUserSubscribers,getMenteeSubscriptions } from "../controllers/subscription.controller.js";
import { verifyMentorJwt } from "../middlewares/mentorAuth.middleware.js";
const router = Router();


router.route('/getSubscription').post(verifyJwt , getSubscription);
router.route('/getUserSubscribers').post( verifyMentorJwt , getUserSubscribers);
router.route('/getMenteeSubscriptions').post(verifyJwt , getMenteeSubscriptions);
// import { getSubscription } from "../controllers/subscription.controller.js";
// const router = Router();
// router.route('/getSubscription').post(verifyJwt , getSubscription);


export default router;