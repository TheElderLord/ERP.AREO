// src/controllers/authController.ts
import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import User from '../models/User';
import Token from '../models/Token';
import { generateAccessToken, generateRefreshToken } from '../utils/tokenUtils';
import parseDuration from '../utils/parseDuration';
import logger from '../utils/logger';

export const signup = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  // Validate Input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next({ status: 400, message: 'Validation Failed', errors: errors.array() });
  }

  const { id, password, deviceId } = req.body;

  try {
    const existingUser = await User.findOne({ where: { identifier: id } });
    if (existingUser) {
      return next({ status: 400, message: 'User already exists' });
    }

    const user = await User.create({
      identifier: id,
      password,
    });

    const accessToken = generateAccessToken(user, deviceId);
    const refreshToken = generateRefreshToken(user, deviceId);

    const expiresInMilliseconds = parseDuration(process.env.REFRESH_TOKEN_EXPIRY || '7d');

    await Token.create({
      userId: user.id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + expiresInMilliseconds),
      deviceId,
    });

    res.status(201).json({ accessToken, refreshToken });
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
    const user = await User.findOne({ where: { identifier: id } });

    if (!user) {
      return next({ status: 400, message: 'User not found' });
    }

    const isValidPassword = await user.comparePassword(password);

    if (!isValidPassword) {
      return next({ status: 400, message: 'Incorrect password' });
    }

    const accessToken = generateAccessToken(user, deviceId);
    const refreshToken = generateRefreshToken(user, deviceId);

    const expiresInMilliseconds = parseDuration(process.env.REFRESH_TOKEN_EXPIRY || '7d');

    await Token.create({
      userId: user.id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + expiresInMilliseconds),
      deviceId,
    });

    res.json({ accessToken, refreshToken });
  } catch (error) {
    logger.error(`Signin Error: ${getErrorMessage(error)}`);
    next(error);
  }
});

export const refreshToken = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { refreshToken, deviceId } = req.body;

  if (!refreshToken) return next({ status: 401, message: 'Refresh token required' });

  try {
    const payload: any = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string);

    // Check if refresh token is revoked
    const tokenRecord = await Token.findOne({
      where: { token: refreshToken, revoked: false },
    });

    if (!tokenRecord) {
      return next({ status: 401, message: 'Refresh token revoked or invalid' });
    }

    const user = await User.findByPk(payload.id);

    if (!user) {
      return next({ status: 400, message: 'User not found' });
    }

    const newAccessToken = generateAccessToken(user, deviceId);

    res.json({ accessToken: newAccessToken });
  } catch (error) {
    logger.error(`Refresh Token Error: ${getErrorMessage(error)}`);
    next({ status: 403, message: 'Invalid refresh token' });
  }
});

export const logout = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.headers.authorization?.split(' ')[1];

  try {
    // Revoke the access token
    await Token.update({ revoked: true }, { where: { token: accessToken } });

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
