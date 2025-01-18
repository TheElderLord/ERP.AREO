// src/routes/authRoutes.ts
import { Router } from 'express';
import { signin, refreshToken, logout } from '../controllers/auth.controller';
import { validateSignup, validateSignin } from '../../../validators/authValidator';

const router = Router();

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
