import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { addParticipant, createLocalEvent, deleteEvent, getEventById, removeParticipant ,getAllEvents } from "../controllers/event.controller.js";

const router = Router();

router.route('/createLocalEvent').post(verifyJwt , createLocalEvent)
router.route('/deleteEvent/:eventId').post(verifyJwt , deleteEvent)
router.route('/addParticipant/:eventId/:userId').post(verifyJwt , addParticipant);
router.route('/removeParticipant/:eventId/:userId').post(verifyJwt , removeParticipant);
router.route('/getEventById/:eventId').post(getEventById);
router.route('/getAllEvents').post(getAllEvents);

export default router;