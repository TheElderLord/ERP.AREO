"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/utils/logger.ts
const winston_1 = require("winston");
const logger = (0, winston_1.createLogger)({
    level: process.env.NODE_ENV === 'prod' ? 'info' : 'debug',
    format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json()),
    transports: [
        new winston_1.transports.Console(),
        // You can add file transports or other transports as needed
    ],
});
exports.default = logger;
