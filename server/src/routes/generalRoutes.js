import { Router } from "express";
import { getAllMentors } from "../controllers/general.controller.js";
const router = Router();


router.route('/allMentors').get(getAllMentors);

export default router;