"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const corsMiddleware_1 = __importDefault(require("./middlewares/corsMiddleware"));
const securityMiddleware_1 = __importDefault(require("./middlewares/securityMiddleware"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
// Middlewares
app.use(express_1.default.json());
app.use(corsMiddleware_1.default);
app.use(securityMiddleware_1.default);
// Routes
app.use('/', routes_1.default);
// Error Handler
app.use(errorHandler_1.default);
exports.default = app;
