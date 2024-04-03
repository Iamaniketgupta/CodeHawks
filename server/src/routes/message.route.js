import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware2.js";
import {getAllMessagesByUserId , deleteMessagesByUserId} from '../controllers/message.controller.js'

const router = Router();

router.route("/getAllMessagesByUserId").post(getAllMessagesByUserId);
router.route("/deleteMessagesByUserId").post(deleteMessagesByUserId);


export default router;