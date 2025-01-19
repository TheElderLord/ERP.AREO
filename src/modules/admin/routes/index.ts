// src/routes/index.ts
import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import roomsRoutes from './rooms.routes';
// import fileRoutes from './fileRoutes';

const router = Router();

// Use the route modules
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/rooms', roomsRoutes);

export default router;
