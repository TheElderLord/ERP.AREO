// src/routes/index.ts
import { Router } from 'express';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import fileRoutes from './fileRoutes';

const router = Router();

// Use the route modules
router.use('/', authRoutes);
router.use('/', userRoutes);
router.use('/', fileRoutes);

export default router;
