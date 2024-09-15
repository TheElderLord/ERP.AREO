import * as dotenv from 'dotenv';
import path from 'path';

// Determine the environment and set the path to the corresponding .env file
const envFile = `.env.${process.env.NODE_ENV || 'dev'}`;

// Load the environment variables from the specified file
dotenv.config({ path: path.resolve(__dirname, '..', envFile) });

// ... rest of your imports and server setup code

import app from './app';
import { sequelize } from './config';
import logger from './utils/logger';

const PORT = process.env.PORT || 3000;


// ... existing imports

console.log(`Running in ${process.env.NODE_ENV} mode`);
console.log(`Database Host: ${process.env.DB_HOST}`);

// ... rest of your server code


sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    logger.info(`Server started on port ${PORT} in ${process.env.NODE_ENV} mode`);
  });
});
