import express from 'express';
import { createAdminAccount } from '../controllers/seedController.js';

const seedRouter = express.Router();


seedRouter.get('/create-admin', createAdminAccount);

export default seedRouter;