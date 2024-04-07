
import express from 'express';
const router = express.Router();
import { verifyJwt } from '../middlewares/auth.middleware2.js';
import { getCheckoutSessionAndHandleWebhook } from '../controllers/subscription.controller.js';


router.route("/checkout-session/:mentorId").post(getCheckoutSessionAndHandleWebhook);



export default router;