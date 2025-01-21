// src/controllers/userController.ts
import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import logger from '../../../utils/logger';
import RequestService from '../services/request.service';


export const getRequestsRequestHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const requests = await RequestService.getAllRequests();
        res.json({
            msg: 'All requests',
            data: requests
        });
    } catch (error) {
        logger.error(`Get Request Info Error: ${getErrorMessage(error)}`);
        next(error);
    }
});

export const getRequestByIdHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = Number(req.params.id);
        // const userService = new UserService(sequelize);
        // console.log(req.params)
        const request = await RequestService.getRequestById(userId);
        res.json(request);
    } catch (error) {
        logger.error(`Get Request Info Error: ${getErrorMessage(error)}`);
        next(error);
    }
});


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

export const deleteRequestHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const requestId = Number(req.params.id);
        const deletedRequest = await RequestService.deleteRequest(requestId);
        res.json(deletedRequest);
    } catch (error) {
        logger.error(`Delete User Info Error: ${getErrorMessage(error)}`);
        next(error);
    }
});


function getErrorMessage(error: unknown): string {
    if (error instanceof Error) return error.message;
    return String(error);
}
