import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateAccessToken = (user: any, deviceId: string) => {
  return jwt.sign({ id: user.id, deviceId }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.TOKEN_EXPIRY,
    algorithm: 'HS256',
  });
};

export const generateRefreshToken = (user: any, deviceId: string) => {
  return jwt.sign({ id: user.id, deviceId }, process.env.JWT_REFRESH_SECRET as string, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    algorithm: 'HS256',
  });
};
