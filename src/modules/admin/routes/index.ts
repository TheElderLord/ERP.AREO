// src/routes/index.ts
import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
// import fileRoutes from './fileRoutes';

const router = Router();

// Use the route modules
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
// router.use('/', fileRoutes);

export default router;
