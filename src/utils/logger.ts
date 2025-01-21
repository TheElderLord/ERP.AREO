import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const dailyRotateTransport = new DailyRotateFile({
  filename: 'logs/application-%DATE%.log', // The %DATE% placeholder is replaced by the current date
  datePattern: 'YYYY-MM-DD',
  zippedArchive: false,       // Set to `true` if you want Gzip compressed backups
  maxSize: '20m',             // Max size of each log file before creating a new one
  maxFiles: '14d',            // How many days of logs to keep
  level: process.env.NODE_ENV === 'prod' ? 'info' : 'debug',
});

const logger = createLogger({
  level: process.env.NODE_ENV === 'prod' ? 'info' : 'debug',
  format: format.combine(
    format.timestamp(),
    format.json(),
  ),
  transports: [
    new transports.Console(),  // logs to console
    dailyRotateTransport,      // logs with daily rotation
  ],
});

export default logger;
