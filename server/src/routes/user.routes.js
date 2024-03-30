import { Router } from "express";
import { editProfile, exampleFunc, login, logoutUser, signup, toggleFollow,getAllUsers , recommendUsers , findPeople , getCurrentUser} from "../controllers/user.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { uploadImage } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/example").post(exampleFunc);
router.route('/signup').post(uploadImage.single("avatar"), signup);
router.route('/login').post(login);
router.route('/logout').post(verifyJwt , logoutUser);
router.route('/editProfile').post(verifyJwt , editProfile);
router.route('/recommendUsers').post(verifyJwt , recommendUsers);
router.route('/toggleFollow/:userId').post(verifyJwt , toggleFollow);
router.route('/findPeople').post(findPeople);
router.route('/getCurrentUser').post(verifyJwt , getCurrentUser);
router.route('/getAllUsers').post(getAllUsers)

export default router;
