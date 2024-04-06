import express from 'express';
import { verifyMentorJwt } from '../middlewares/mentorAuth.middleware.js';
import { verifyJwt } from "../middlewares/auth.middleware2.js";

import {addTimeslot , bookSlot, deleteTimeslot, getAllSlots} from '../controllers/timeslot.controller.js'

const router = express.Router();

router.route('/addTimeslot').post(verifyMentorJwt , addTimeslot);
router.route('/deleteSlots/:slotId').delete(verifyMentorJwt , deleteTimeslot);
router.route('/bookSlot').post(verifyJwt , bookSlot);
router.route('/getAllSlots').get( getAllSlots);

export default router;