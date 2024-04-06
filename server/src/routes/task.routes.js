import express from 'express';
import { verifyMentorJwt } from '../middlewares/mentorAuth.middleware.js';
import { verifyJwt } from '../middlewares/auth.middleware2.js';
import { assignTask, changeTaskStatus,getAllMenteeTasks, submitTask, editSubmittedTask , markTaskAsComplete , getTaskSubmissions , deleteTask  , getAllTasks} from '../controllers/task.controller.js';

const taskRouter = express.Router();

taskRouter.route('/assign-task').post(verifyMentorJwt, assignTask);
taskRouter.route('/change-task-status').put(verifyMentorJwt, changeTaskStatus);
taskRouter.route('/submit-task').post(verifyJwt, submitTask);
taskRouter.route('/editSubmittedTask').post(verifyJwt, editSubmittedTask);
taskRouter.route('/markTaskAsComplete').post(verifyMentorJwt, markTaskAsComplete);
taskRouter.route('/getTaskSubmissions').post(verifyMentorJwt, getTaskSubmissions);
taskRouter.route('/deleteTask').post(verifyMentorJwt, deleteTask);
taskRouter.route('/getAllTasks').post(verifyMentorJwt, getAllTasks);
taskRouter.route('/getAllMenteeTasks').post(verifyJwt, getAllMenteeTasks);

export default taskRouter;
