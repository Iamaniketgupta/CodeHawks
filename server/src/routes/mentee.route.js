import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware2.js";
import { uploadImage } from "../middlewares/multer.middleware.js";
import { signup , login , logoutUser , addMentorToBookmark , removeMentorFromBookmark , updateMenteeAvatar , updateMenteeProfile, getMenteeBookmarks } from "../controllers/mentee.controller.js";

const router = Router();

router.route('/signup').post(signup );
router.route('/login').post(login);
router.route('/logout').post(verifyJwt , logoutUser);

router.route('/addMentorToBookmark').post(verifyJwt , addMentorToBookmark);
router.route('/removeMentorFromBookmark').post(verifyJwt , removeMentorFromBookmark);
router.route('/updateMenteeAvatar').post(verifyJwt ,  uploadImage.single("avatar") ,updateMenteeAvatar);

router.route('/addMentorToBookmark').put(verifyJwt , addMentorToBookmark);
router.route('/removeMentorFromBookmark').delete(verifyJwt , removeMentorFromBookmark);
router.route('/allBookmarks').get(verifyJwt , getMenteeBookmarks);
router.route('/updateMenteeAvatar').post(verifyJwt , updateMenteeAvatar);

router.route('/updateMenteeProfile').post(verifyJwt , updateMenteeProfile);

export default router;