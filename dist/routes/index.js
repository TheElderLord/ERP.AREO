"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/index.ts
const express_1 = require("express");
const authRoutes_1 = __importDefault(require("./authRoutes"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const fileRoutes_1 = __importDefault(require("./fileRoutes"));
const router = (0, express_1.Router)();
// Use the route modules
router.use('/', authRoutes_1.default);
router.use('/', userRoutes_1.default);
router.use('/', fileRoutes_1.default);
exports.default = router;
