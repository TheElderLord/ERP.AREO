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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const Token_1 = __importDefault(require("../models/Token"));
dotenv_1.default.config();
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    const accessToken = authHeader && authHeader.split(' ')[1];
    if (!accessToken)
        return res.status(401).json({ message: 'Token required' });
    try {
        const payload = jsonwebtoken_1.default.verify(accessToken, process.env.JWT_SECRET);
        // Check if token is revoked
        const tokenRecord = yield Token_1.default.findOne({
            where: { token: accessToken, revoked: true },
        });
        if (tokenRecord) {
            return res.status(401).json({ message: 'Token revoked' });
        }
        req.user = payload;
        next();
    }
    catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
    }
});
exports.default = authMiddleware;
