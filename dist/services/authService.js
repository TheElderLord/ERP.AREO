"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/services/authService.ts
const User_1 = __importDefault(require("../models/User"));
const Token_1 = __importDefault(require("../models/Token"));
const tokenUtils_1 = require("../utils/tokenUtils");
const parseDuration_1 = __importDefault(require("../utils/parseDuration"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthService {
    register(identifier, password, deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if user already exists
            const existingUser = yield User_1.default.findOne({ where: { identifier } });
            if (existingUser) {
                throw new Error('User already exists');
            }
            // Create new user
            const user = yield User_1.default.create({ identifier, password });
            // Generate tokens
            const accessToken = (0, tokenUtils_1.generateAccessToken)(user, deviceId);
            const refreshToken = (0, tokenUtils_1.generateRefreshToken)(user, deviceId);
            // Save refresh token to database
            const expiresInMilliseconds = (0, parseDuration_1.default)(process.env.REFRESH_TOKEN_EXPIRY || '7d');
            yield Token_1.default.create({
                userId: user.id,
                token: refreshToken,
                expiresAt: new Date(Date.now() + expiresInMilliseconds),
                deviceId,
            });
            return { accessToken, refreshToken };
        });
    }
    login(identifier, password, deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Find user by identifier
            const user = yield User_1.default.findOne({ where: { identifier } });
            if (!user) {
                throw new Error('User not found');
            }
            // Verify password
            const isValidPassword = yield user.comparePassword(password);
            if (!isValidPassword) {
                throw new Error('Incorrect password');
            }
            // Generate tokens
            const accessToken = (0, tokenUtils_1.generateAccessToken)(user, deviceId);
            const refreshToken = (0, tokenUtils_1.generateRefreshToken)(user, deviceId);
            // Save refresh token to database
            const expiresInMilliseconds = (0, parseDuration_1.default)(process.env.REFRESH_TOKEN_EXPIRY || '7d');
            yield Token_1.default.create({
                userId: user.id,
                token: refreshToken,
                expiresAt: new Date(Date.now() + expiresInMilliseconds),
                deviceId,
            });
            return { accessToken, refreshToken };
        });
    }
    refreshAccessToken(refreshToken, deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Verify refresh token
            const payload = jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
            // Check if refresh token is revoked
            const tokenRecord = yield Token_1.default.findOne({
                where: { token: refreshToken, revoked: false },
            });
            if (!tokenRecord) {
                throw new Error('Refresh token revoked or invalid');
            }
            // Find user
            const user = yield User_1.default.findByPk(payload.id);
            if (!user) {
                throw new Error('User not found');
            }
            // Generate new access token
            const newAccessToken = (0, tokenUtils_1.generateAccessToken)(user, deviceId);
            return { accessToken: newAccessToken };
        });
    }
    logout(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            // Revoke the access token
            yield Token_1.default.update({ revoked: true }, { where: { token: accessToken } });
        });
    }
}
exports.default = new AuthService();
