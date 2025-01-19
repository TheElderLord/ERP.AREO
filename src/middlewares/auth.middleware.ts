import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Token from '../models/Token';
import { User } from '../models/User';
import { Role } from '../types/enums/role.enum';
import { AuthRequest, UserResponse } from '../types/express/express-custom';

dotenv.config();

const authMiddleware = async (req: AuthRequest, res: UserResponse, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const accessToken = authHeader && authHeader.split(' ')[1];

  if (!accessToken) return res.status(401).json({ message: 'Token required' });

  try {
    const payload: any = jwt.verify(accessToken, process.env.JWT_SECRET as string);

    // Check if token is revoked
    // const tokenRecord = await Token.findOne({
    //   where: { token: accessToken, revoked: true },
    // });

    // if (tokenRecord) {
    //   return res.status(401).json({ message: 'Token revoked' });
    // }

    // // Now TypeScript will no longer complain here:
   

    // return next();
    
    
    // console.log(payload)
    if(payload.role !== 'ADMIN'){
      return res.status(401).json({ message: 'Forbidden' });
    }

    req.user = {
      id: payload.id,
      login: payload.login,
      password: payload.password,
    };

    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

export default authMiddleware;
