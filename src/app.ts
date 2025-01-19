// src/app.ts
import express from 'express';
import corsMiddleware from './middlewares/cors.middleware';
import securityMiddleware from './middlewares/security.middleware';
import errorHandler from './middlewares/error.handler';
import adminRoutes from './modules/admin/routes';

const app = express();

// Middlewares
app.use(express.json());
app.use(corsMiddleware);
app.use(securityMiddleware);

// Routes
app.use('/admin', adminRoutes);

// Error Handler
app.use(errorHandler);

export default app;
