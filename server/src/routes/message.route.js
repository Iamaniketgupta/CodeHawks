import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware2.js";
import {getAllMessagesByUserId , deleteMessagesByUserId , getUsersWithChatHistory , getPersonById} from '../controllers/message.controller.js'

const router = Router();

router.route("/getAllMessagesByUserId").post(getAllMessagesByUserId);
router.route("/deleteMessagesByUserId").post(deleteMessagesByUserId);
router.route("/getUsersWithChatHistory").post(getUsersWithChatHistory);
router.route("/getPersonById").post(getPersonById);


export default router;
