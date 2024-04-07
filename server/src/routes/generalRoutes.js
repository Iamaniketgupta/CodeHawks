import { Router } from "express";
import { getAllMentors  , verifyMenteeId  , verifyMentorId , verifyPersonById} from "../controllers/general.controller.js";
const router = Router();


router.route('/allMentors').get(getAllMentors);

router.route('/refresh').post(verifyPersonById);
router.route('/refreshMentor').post(verifyMentorId);

export default router;