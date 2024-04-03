import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware2.js";
import { getSubscription } from "../controllers/subscription.controller.js";

const router = Router();



router.route('/getSubscription').post(verifyJwt , getSubscription);

export default router;