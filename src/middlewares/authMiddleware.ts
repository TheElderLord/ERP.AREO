// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Token from '../models/Token';

dotenv.config();

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const accessToken = authHeader && authHeader.split(' ')[1];

  if (!accessToken) return res.status(401).json({ message: 'Token required' });

  try {
    const payload: any = jwt.verify(accessToken, process.env.JWT_SECRET as string);

    // Check if token is revoked
    const tokenRecord = await Token.findOne({
      where: { token: accessToken, revoked: true },
    });

    if (tokenRecord) {
      return res.status(401).json({ message: 'Token revoked' });
    }

    req.user = {
      id: payload.id,
      deviceId: payload.deviceId,
    };
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

export default authMiddleware;
