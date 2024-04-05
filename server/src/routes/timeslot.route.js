import express from 'express';
import { verifyMentorJwt } from '../middlewares/mentorAuth.middleware.js';
import {addTimeslot , deleteTimeslot, getAllSlots} from '../controllers/timeslot.controller.js'

const router = express.Router();

router.route('/addTimeslot').post(verifyMentorJwt , addTimeslot);
router.route('/deleteTimeslot').delete(verifyMentorJwt , deleteTimeslot);
router.route('/getAllSlots').get(getAllSlots);

export default router;