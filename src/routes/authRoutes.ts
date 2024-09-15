// src/routes/authRoutes.ts
import { Router } from 'express';
import { signup, signin, refreshToken, logout } from '../controllers/authController';
import { validateSignup, validateSignin } from '../validators/authValidator';

const router = Router();

/**
 * @route   POST /signup
 * @desc    Register a new user
 * @access  Public
 */
router.post('/signup', validateSignup, signup);

/**
 * @route   POST /signin
 * @desc    Authenticate user and get tokens
 * @access  Publics
 */
router.post('/signin', validateSignin, signin);

/**
 * @route   POST /refresh-token
 * @desc    Refresh access token
 * @access  Public
 */
router.post('/signin/:refresh', refreshToken);

/**
 * @route   POST /logout
 * @desc    Logout user by revoking tokens
 * @access  Private
 */
router.post('/logout', logout);

export default router;
