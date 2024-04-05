import express from 'express';
import { verifyMentorJwt } from '../middlewares/mentorAuth.middleware.js';
import { verifyJwt } from '../middlewares/auth.middleware2.js';
import { assignTask, changeTaskStatus, submitTask ,getTopTask,getAllTask} from '../controllers/task.controller.js';

const taskRouter = express.Router();

taskRouter.route('/assign-task').post(verifyMentorJwt, assignTask);
taskRouter.route('/change-task-status').put(verifyMentorJwt, changeTaskStatus);
taskRouter.route('/submit-task').post(verifyJwt, submitTask);
taskRouter.route('/get-top-task').get(verifyJwt,getTopTask);
taskRouter.route('/get-all-task').get(verifyJwt,getAllTask);

export default taskRouter;
