// src/routes/index.ts
import { Router } from 'express';

import roomsRoutes from './rooms.routes';
// import fileRoutes from './fileRoutes';

const router = Router();

// Use the route modules

router.use('/rooms', roomsRoutes);

export default router;
