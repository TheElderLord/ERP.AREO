"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/middlewares/securityMiddleware.ts
const helmet_1 = __importDefault(require("helmet"));
const securityMiddleware = (0, helmet_1.default)();
exports.default = securityMiddleware;
