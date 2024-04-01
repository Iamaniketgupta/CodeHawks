import express from 'express';
import { verifyMentorJwt } from '../middlewares/mentorAuth.middleware.js';
import {addTimeslot , deleteTimeslot} from '../controllers/timeslot.controller.js'

const router = express.Router();

router.route('/addTimeslot').post(verifyMentorJwt , addTimeslot);
router.route('/deleteTimeslot').post(verifyMentorJwt , deleteTimeslot);

export default router;