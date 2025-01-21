// src/routes/index.ts
import { Router } from 'express';
import roomsRoutes from './rooms.routes';
import requestRoutes from './request.routes';
import bookingRoutes from './booking.routes';
import authMiddleware from '../../../middlewares/auth.middleware';
// import fileRoutes from './fileRoutes';

const router = Router();

// Use the route modules
router.use('/rooms',  roomsRoutes);
router.use('/requests',  requestRoutes);
router.use('/booking', bookingRoutes);

export default router;
