// src/utils/tokenUtils.ts
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { Role } from '../types/enums/role.enum';

export function generateAccessToken(user: User): string {
  const payload = {
    id: user.id,
    role: user.role,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: process.env.TOKEN_EXPIRY || '10m',
  });

  return token;
}

export function generateRefreshToken(user: User): string {
  const payload = {
    id: user.id,
    
  };

  const token = jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '7d',
  });

  return token;
}
