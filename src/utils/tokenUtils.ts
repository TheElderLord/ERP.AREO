// src/utils/tokenUtils.ts
import jwt from 'jsonwebtoken';
import User from '../models/User';

export function generateAccessToken(user: User, deviceId?: string): string {
  const payload = {
    id: user.id,
    deviceId,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: process.env.TOKEN_EXPIRY || '10m',
  });

  return token;
}

export function generateRefreshToken(user: User, deviceId?: string): string {
  const payload = {
    id: user.id,
    deviceId,
  };

  const token = jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '7d',
  });

  return token;
}
