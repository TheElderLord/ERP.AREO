// src/routes/index.ts
import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import roomsRoutes from './rooms.routes';
import requestRoutes from './request.routes';
import bookingRoutes from './booking.routes';
import authMiddleware from '../../../middlewares/auth.middleware';
// import fileRoutes from './fileRoutes';

const router = Router();

// Use the route modules
router.use('/auth', authRoutes);
router.use('/users', authMiddleware, userRoutes);
router.use('/rooms', authMiddleware, roomsRoutes);
router.use('/requests', authMiddleware, requestRoutes);
router.use('/booking', authMiddleware, bookingRoutes);

export default router;
