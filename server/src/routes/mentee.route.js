import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware2.js";
import { uploadImage } from "../middlewares/multer.middleware.js";
import { signup , login , logoutUser , addMentorToBookmark , removeMentorFromBookmark , updateMenteeAvatar , updateMenteeProfile } from "../controllers/mentee.controller.js";

const router = Router();

router.route('/signup').post(uploadImage.single("avatar"), signup , login);
router.route('/login').post(login);
router.route('/logout').post(verifyJwt , logoutUser);
router.route('/addMentorToBookmark').post(verifyJwt , addMentorToBookmark);
router.route('/removeMentorFromBookmark').post(verifyJwt , removeMentorFromBookmark);
router.route('/updateMenteeAvatar').post(verifyJwt , updateMenteeAvatar);
router.route('/updateMenteeProfile').post(verifyJwt , updateMenteeProfile);

export default router;