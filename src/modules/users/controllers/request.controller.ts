// src/controllers/userController.ts
import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import logger from '../../../utils/logger';
import RequestService from '../services/request.service';




export const createRequestHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const images = req.files ? (req.files as Express.Multer.File[]).map((file) => file.originalname).join(",") : "Not specified";
        req.body.images = images;
        
        const createdRequest = await RequestService.createRequest(req.body);
        // const updatedUser = await userService.createUser();
        res.json(createdRequest);
    } catch (error) {
        logger.error(`Create User Info Error: ${getErrorMessage(error)}`);
        next(error);
    }
});




function getErrorMessage(error: unknown): string {
    if (error instanceof Error) return error.message;
    return String(error);
}
