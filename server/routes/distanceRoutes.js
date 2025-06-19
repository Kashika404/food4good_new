import express from 'express';
import { calculateDistance } from '../controllers/distanceController.js';
import authMiddleware from '../middleware/auth.js';

const distanceRouter = express.Router();

// This route is protected; only logged-in users can calculate distances.
distanceRouter.post('/calculate', authMiddleware, calculateDistance);

export default distanceRouter;