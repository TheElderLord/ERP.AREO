"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/userRoutes.ts
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const router = (0, express_1.Router)();
/**
 * @route   GET /user
 * @desc    Get user information
 * @access  Private
 */
router.get('/user', authMiddleware_1.default, userController_1.getUserInfo);
/**
 * @route   PUT /user
 * @desc    Update user information
 * @access  Private
 */
router.put('/user', authMiddleware_1.default, userController_1.updateUserInfo);
exports.default = router;
