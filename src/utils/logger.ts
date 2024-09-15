// src/utils/logger.ts
import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  level: process.env.NODE_ENV === 'prod' ? 'info' : 'debug',
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.Console(),
    // You can add file transports or other transports as needed
  ],
});

export default logger;
