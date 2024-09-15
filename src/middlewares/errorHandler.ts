import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'express-validator';
import logger from '../utils/logger';

interface Error {
  status?: number;
  message: string;
  errors?: ValidationError[];
}

const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  logger.error(`${status} - ${message}`);

  res.status(status).json({
    message,
    errors: err.errors || [],
  });
};

export default errorHandler;
