// src/types/express-custom.ts
import { Request, Response } from 'express';

export interface AuthRequest extends Request {
  // Add any custom properties here
  user?: {
    id: number;
    login: string;
    password: string;
  };
}

export interface UserRequest extends Request {
    // Add any custom properties for the request here
    user?: {
      id: number;
      login: string;
      password: string;
    };
    headers: {
        authorization:string
    }
    
}

    

export interface UserResponse extends Response {
  // Add any custom properties for the response here
  customData?: string;
}
