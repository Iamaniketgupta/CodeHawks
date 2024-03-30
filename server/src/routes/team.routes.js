import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { createTeam, findTeam ,addMembers , removeMember,getMyTeams ,addOneMember,getAllTeams , getRoomByTeamId} from "../controllers/team.controller.js";

const router = Router();

router.route('/createTeam').post(verifyJwt , createTeam);
router.route('/findTeam').post(findTeam);
router.route('/addMembers/:teamId').post(verifyJwt , addMembers);
router.route('/removeMember/:teamId/:member').post(verifyJwt , removeMember);
router.route('/addOneMembers/:teamId/:member').post(verifyJwt , addOneMember);
router.route('/getRoomByTeamId/:teamId').post(verifyJwt , getRoomByTeamId);
router.route('/getAllTeams').post(getAllTeams);
router.route("/getMyTeams").post(verifyJwt , getMyTeams);

export default router;
