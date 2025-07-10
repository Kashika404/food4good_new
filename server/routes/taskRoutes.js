import express from 'express';
import { listOpenTasks, assignTaskToVolunteer, getVolunteerStats, listVolunteerTasks, completeTask, deleteOrphanedTasks } from '../controllers/taskController.js';
import authMiddleware from '../middleware/auth.js';
import adminAuth from '../middleware/adminAuth.js';

const taskRouter = express.Router();


taskRouter.get("/open", authMiddleware, listOpenTasks);

taskRouter.get("/stats", authMiddleware, getVolunteerStats);
taskRouter.get("/list", authMiddleware, listVolunteerTasks);



taskRouter.post("/assign", authMiddleware, assignTaskToVolunteer);
taskRouter.post("/complete/:taskId", authMiddleware, completeTask);
taskRouter.delete("/cleanup-orphaned", authMiddleware, adminAuth, deleteOrphanedTasks);

export default taskRouter;