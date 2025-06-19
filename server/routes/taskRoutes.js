import express from 'express';
// import { listOpenTasks, assignTaskToVolunteer } from '../controllers/taskController.js';

import { listOpenTasks, assignTaskToVolunteer, getVolunteerStats, listVolunteerTasks,completeTask } from '../controllers/taskController.js';
import authMiddleware from '../middleware/auth.js';

const taskRouter = express.Router();

// Route for volunteers to get a list of all open tasks
taskRouter.get("/open", authMiddleware, listOpenTasks);

taskRouter.get("/stats", authMiddleware, getVolunteerStats);
taskRouter.get("/list", authMiddleware, listVolunteerTasks);


// Route for a volunteer to accept/assign a task to themselves
taskRouter.post("/assign", authMiddleware, assignTaskToVolunteer);
taskRouter.post("/complete/:taskId", authMiddleware, completeTask);

export default taskRouter;