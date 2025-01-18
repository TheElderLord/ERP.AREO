import { Sequelize } from 'sequelize-typescript';
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  models: [path.resolve(__dirname, '..', 'models')],
  logging: false,

});

(async () => {
  // This will alter the tables to match the model definitions (not recommended for prod)
  await sequelize.sync({ alter: true });
})();

export default sequelize;
