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
const authService_1 = __importDefault(require("../services/authService"));
const express_validator_1 = require("express-validator");
const logger_1 = __importDefault(require("../utils/logger"));
exports.signup = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Validate Input
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return next({ status: 400, message: 'Validation Failed', errors: errors.array() });
    }
    const { id, password, deviceId } = req.body;
    try {
        const tokens = yield authService_1.default.register(id, password, deviceId);
        res.status(201).json(tokens);
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
        const tokens = yield authService_1.default.login(id, password, deviceId);
        res.json(tokens);
    }
    catch (error) {
        logger_1.default.error(`Signin Error: ${getErrorMessage(error)}`);
        next(error);
    }
}));
exports.refreshToken = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { deviceId } = req.body;
    const refreshToken = req.params.refresh;
    console.log(refreshToken);
    if (!refreshToken)
        return next({ status: 401, message: 'Refresh token required' });
    try {
        const newToken = yield authService_1.default.refreshAccessToken(refreshToken, deviceId);
        res.json(newToken);
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
        yield authService_1.default.logout(accessToken);
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
