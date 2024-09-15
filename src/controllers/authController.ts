// src/controllers/authController.ts
import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import authService from '../services/authService';
import { validationResult } from 'express-validator';
import logger from '../utils/logger';

export const signup = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  // Validate Input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next({ status: 400, message: 'Validation Failed', errors: errors.array() });
  }

  const { id, password, deviceId } = req.body;

  try {
    const tokens = await authService.register(id, password, deviceId);
    res.status(201).json(tokens);
  } catch (error) {
    logger.error(`Signup Error: ${getErrorMessage(error)}`);
    next(error);
  }
});

export const signin = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  // Validate Input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next({ status: 400, message: 'Validation Failed', errors: errors.array() });
  }

  const { id, password, deviceId } = req.body;

  try {
    const tokens = await authService.login(id, password, deviceId);
    res.json(tokens);
  } catch (error) {
    logger.error(`Signin Error: ${getErrorMessage(error)}`);
    next(error);
  }
});

export const refreshToken = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { refreshToken, deviceId } = req.body;

  if (!refreshToken) return next({ status: 401, message: 'Refresh token required' });

  try {
    const newToken = await authService.refreshAccessToken(refreshToken, deviceId);
    res.json(newToken);
  } catch (error) {
    logger.error(`Refresh Token Error: ${getErrorMessage(error)}`);
    next({ status: 403, message: 'Invalid refresh token' });
  }
});

export const logout = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.headers.authorization?.split(' ')[1];

  try {
    await authService.logout(accessToken!);
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    logger.error(`Logout Error: ${getErrorMessage(error)}`);
    next(error);
  }
});

/**
 * Helper function to extract error message from an unknown error type.
 * @param error - The unknown error object.
 * @returns The error message as a string.
 */
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}
