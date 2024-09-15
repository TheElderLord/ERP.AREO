"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.generateAccessToken = void 0;
// src/utils/tokenUtils.ts
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateAccessToken(user, deviceId) {
    const payload = {
        id: user.id,
        deviceId,
    };
    const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRY || '10m',
    });
    return token;
}
exports.generateAccessToken = generateAccessToken;
function generateRefreshToken(user, deviceId) {
    const payload = {
        id: user.id,
        deviceId,
    };
    const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_REFRESH_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '7d',
    });
    return token;
}
exports.generateRefreshToken = generateRefreshToken;
