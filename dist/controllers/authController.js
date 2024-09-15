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
exports.logout = exports.refreshToken = exports.signin = exports.signup = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_validator_1 = require("express-validator");
const User_1 = __importDefault(require("../models/User"));
const Token_1 = __importDefault(require("../models/Token"));
const tokenUtils_1 = require("../utils/tokenUtils");
const parseDuration_1 = __importDefault(require("../utils/parseDuration"));
const logger_1 = __importDefault(require("../utils/logger"));
exports.signup = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Validate Input
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return next({ status: 400, message: 'Validation Failed', errors: errors.array() });
    }
    const { id, password, deviceId } = req.body;
    try {
        const existingUser = yield User_1.default.findOne({ where: { identifier: id } });
        if (existingUser) {
            return next({ status: 400, message: 'User already exists' });
        }
        const user = yield User_1.default.create({
            identifier: id,
            password,
        });
        const accessToken = (0, tokenUtils_1.generateAccessToken)(user, deviceId);
        const refreshToken = (0, tokenUtils_1.generateRefreshToken)(user, deviceId);
        const expiresInMilliseconds = (0, parseDuration_1.default)(process.env.REFRESH_TOKEN_EXPIRY || '7d');
        yield Token_1.default.create({
            userId: user.id,
            token: refreshToken,
            expiresAt: new Date(Date.now() + expiresInMilliseconds),
            deviceId,
        });
        res.status(201).json({ accessToken, refreshToken });
    }
    catch (error) {
        logger_1.default.error(`Signup Error: ${getErrorMessage(error)}`);
        next(error);
    }
}));
exports.signin = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Validate Input
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return next({ status: 400, message: 'Validation Failed', errors: errors.array() });
    }
    const { id, password, deviceId } = req.body;
    try {
        const user = yield User_1.default.findOne({ where: { identifier: id } });
        if (!user) {
            return next({ status: 400, message: 'User not found' });
        }
        const isValidPassword = yield user.comparePassword(password);
        if (!isValidPassword) {
            return next({ status: 400, message: 'Incorrect password' });
        }
        const accessToken = (0, tokenUtils_1.generateAccessToken)(user, deviceId);
        const refreshToken = (0, tokenUtils_1.generateRefreshToken)(user, deviceId);
        const expiresInMilliseconds = (0, parseDuration_1.default)(process.env.REFRESH_TOKEN_EXPIRY || '7d');
        yield Token_1.default.create({
            userId: user.id,
            token: refreshToken,
            expiresAt: new Date(Date.now() + expiresInMilliseconds),
            deviceId,
        });
        res.json({ accessToken, refreshToken });
    }
    catch (error) {
        logger_1.default.error(`Signin Error: ${getErrorMessage(error)}`);
        next(error);
    }
}));
exports.refreshToken = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken, deviceId } = req.body;
    if (!refreshToken)
        return next({ status: 401, message: 'Refresh token required' });
    try {
        const payload = jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        // Check if refresh token is revoked
        const tokenRecord = yield Token_1.default.findOne({
            where: { token: refreshToken, revoked: false },
        });
        if (!tokenRecord) {
            return next({ status: 401, message: 'Refresh token revoked or invalid' });
        }
        const user = yield User_1.default.findByPk(payload.id);
        if (!user) {
            return next({ status: 400, message: 'User not found' });
        }
        const newAccessToken = (0, tokenUtils_1.generateAccessToken)(user, deviceId);
        res.json({ accessToken: newAccessToken });
    }
    catch (error) {
        logger_1.default.error(`Refresh Token Error: ${getErrorMessage(error)}`);
        next({ status: 403, message: 'Invalid refresh token' });
    }
}));
exports.logout = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const accessToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    try {
        // Revoke the access token
        yield Token_1.default.update({ revoked: true }, { where: { token: accessToken } });
        res.json({ message: 'Logged out successfully' });
    }
    catch (error) {
        logger_1.default.error(`Logout Error: ${getErrorMessage(error)}`);
        next(error);
    }
}));
/**
 * Helper function to extract error message from an unknown error type.
 * @param error - The unknown error object.
 * @returns The error message as a string.
 */
function getErrorMessage(error) {
    if (error instanceof Error)
        return error.message;
    return String(error);
}
