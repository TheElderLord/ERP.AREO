// src/app.ts
import express from 'express';
import corsMiddleware from './middlewares/cors.middleware';
import securityMiddleware from './middlewares/security.middleware';
import errorHandler from './middlewares/error.handler';
import adminRoutes from './modules/admin/routes';
import userRoutes from './modules/users/routes';

const app = express();

// Middlewares
app.use(express.json());
app.use(corsMiddleware);
app.use(securityMiddleware);

// Routes
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/user', userRoutes);

// app.use('/', (req, res) => {
//     res.send('Welcome to the Booking API');
// });

// Serve static files from the uploads folder
app.use('/uploads', express.static('uploads'));


// Error Handler
app.use(errorHandler);

export default app;
