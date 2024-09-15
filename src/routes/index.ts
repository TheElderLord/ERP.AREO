import { Router } from 'express';
import authRoutes from './authRoutes';
import fileRoutes from './fileRouter';
import * as userController from '../controllers/userController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.use('/', authRoutes);
router.use('/file', fileRoutes);

router.get('/info', authMiddleware, userController.info);
router.get('/logout', authMiddleware, userController.info);

export default router;
