import express from 'express';
import { listPendingUsers, approveUser, rejectUser  } from '../controllers/userController.js';
import authMiddleware from '../middleware/auth.js';
import adminAuth from '../middleware/adminAuth.js'; // <-- Import the new admin middleware

const adminRouter = express.Router();

// This route first checks if the user is logged in (authMiddleware),
// then checks if they are an admin (adminAuth),
// and only then runs the listPendingUsers function.
adminRouter.get("/pending-users", authMiddleware, adminAuth, listPendingUsers);


adminRouter.post("/approve/:userId", authMiddleware, adminAuth, approveUser);
adminRouter.post("/reject/:userId", authMiddleware, adminAuth, rejectUser);


export default adminRouter;