"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const generateAccessToken = (user, deviceId) => {
    return jsonwebtoken_1.default.sign({ id: user.id, deviceId }, process.env.JWT_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRY,
        algorithm: 'HS256',
    });
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (user, deviceId) => {
    return jsonwebtoken_1.default.sign({ id: user.id, deviceId }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        algorithm: 'HS256',
    });
};
exports.generateRefreshToken = generateRefreshToken;
