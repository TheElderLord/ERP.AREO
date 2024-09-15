import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Token from '../models/Token';

dotenv.config();

interface AuthRequest extends Request {
  user?: any;
}

const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const accessToken = authHeader && authHeader.split(' ')[1];
//   console.log(accessToken)
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

    req.user = payload;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

export default authMiddleware;
