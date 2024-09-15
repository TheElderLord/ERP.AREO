// src/routes/userRoutes.ts
import { Router } from 'express';
import { getUserInfo, updateUserInfo } from '../controllers/userController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

/**
 * @route   GET /user
 * @desc    Get user information
 * @access  Private
 */
router.get('/user', authMiddleware, getUserInfo);

/**
 * @route   PUT /user
 * @desc    Update user information
 * @access  Private
 */
router.put('/user', authMiddleware, updateUserInfo);

export default router;
