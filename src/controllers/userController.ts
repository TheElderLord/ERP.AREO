// src/controllers/userController.ts
import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import userService from '../services/userService';
import logger from '../utils/logger';

export const getUserInfo = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const user = await userService.getUserById(userId);
    res.json(user);
  } catch (error) {
    logger.error(`Get User Info Error: ${getErrorMessage(error)}`);
    next(error);
  }
});

export const updateUserInfo = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const data = req.body;
    const updatedUser = await userService.updateUser(userId, data);
    res.json(updatedUser);
  } catch (error) {
    logger.error(`Update User Info Error: ${getErrorMessage(error)}`);
    next(error);
  }
});

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}
