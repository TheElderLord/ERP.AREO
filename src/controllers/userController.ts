import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

export const info = asyncHandler(async (req: Request, res: Response) => {
  res.json({ userId: (req as any).user.id });
});
