import express from 'express';
import corsMiddleware from './middlewares/corsMiddleware';
import securityMiddleware from './middlewares/securityMiddleware';
import errorHandler from './middlewares/errorHandler';
import routes from './routes';

const app = express();

// Middlewares
app.use(express.json());
app.use(corsMiddleware);
app.use(securityMiddleware);

// Routes
app.use('/', routes);

// Error Handler
app.use(errorHandler);

export default app;
