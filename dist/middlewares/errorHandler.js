"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../utils/logger"));
const errorHandler = (err, _req, res, _next) => {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    logger_1.default.error(`${status} - ${message}`);
    res.status(status).json({
        message,
        errors: err.errors || [],
    });
};
exports.default = errorHandler;
