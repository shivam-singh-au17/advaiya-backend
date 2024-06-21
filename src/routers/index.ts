import express, { Router } from 'express';
import userRoutes from './user-router';
import accountRoutes from './account-router';

const router: Router = express.Router();

router.use('/users', userRoutes);
router.use('/accounts', accountRoutes);

export default router;
