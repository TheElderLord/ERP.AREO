"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/authRoutes.ts
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const authValidator_1 = require("../validators/authValidator");
const router = (0, express_1.Router)();
/**
 * @route   POST /signup
 * @desc    Register a new user
 * @access  Public
 */
router.post('/signup', authValidator_1.validateSignup, authController_1.signup);
/**
 * @route   POST /signin
 * @desc    Authenticate user and get tokens
 * @access  Public
 */
router.post('/signin', authValidator_1.validateSignin, authController_1.signin);
/**
 * @route   POST /refresh-token
 * @desc    Refresh access token
 * @access  Public
 */
router.post('/refresh-token', authController_1.refreshToken);
/**
 * @route   POST /logout
 * @desc    Logout user by revoking tokens
 * @access  Private
 */
router.post('/logout', authController_1.logout);
exports.default = router;
