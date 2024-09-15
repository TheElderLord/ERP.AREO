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
exports.updateUserInfo = exports.getUserInfo = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userService_1 = __importDefault(require("../services/userService"));
const logger_1 = __importDefault(require("../utils/logger"));
exports.getUserInfo = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const user = yield userService_1.default.getUserById(userId);
        res.json(user);
    }
    catch (error) {
        logger_1.default.error(`Get User Info Error: ${getErrorMessage(error)}`);
        next(error);
    }
}));
exports.updateUserInfo = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const data = req.body;
        const updatedUser = yield userService_1.default.updateUser(userId, data);
        res.json(updatedUser);
    }
    catch (error) {
        logger_1.default.error(`Update User Info Error: ${getErrorMessage(error)}`);
        next(error);
    }
}));
function getErrorMessage(error) {
    if (error instanceof Error)
        return error.message;
    return String(error);
}
