"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();
const sequelize = new sequelize_typescript_1.Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    models: [path.resolve(__dirname, '..', 'models')],
    logging: false,
});
exports.default = sequelize;
