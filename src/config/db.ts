import { Sequelize } from 'sequelize-typescript';
const dotenv= require('dotenv');
const path = require('path');

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  models: [path.resolve(__dirname, '..', 'models')],
  logging: false,
});

export default sequelize;
