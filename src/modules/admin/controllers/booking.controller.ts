// src/controllers/userController.ts
import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import logger from '../../../utils/logger';
import bookingService from '../services/booking.service';


export const getBookingsRequestHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookings = await bookingService.getAllbookings();
        res.json({
            msg: 'All bookings',
            data: bookings
        });
    } catch (error) {
        logger.error(`Get User Info Error: ${getErrorMessage(error)}`);
        next(error);
    }
});

export const getBookingByIdHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = Number(req.params.id);
        // const userService = new UserService(sequelize);
        console.log(req.params)
        const user = await bookingService.getbookingById(userId);
        res.json(user);
    } catch (error) {
        logger.error(`Get User Info Error: ${getErrorMessage(error)}`);
        next(error);
    }
});


export const createBookingRequestHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const images = req.files ? (req.files as Express.Multer.File[]).map((file) => file.originalname).join(",") : "Not specified";
        req.body.images = images;
        
        const createdbooking = await bookingService.createbooking(req.body);
        // const updatedUser = await userService.createUser();
        res.json(createdbooking);
    } catch (error) {
        logger.error(`Create User Info Error: ${getErrorMessage(error)}`);
        next(error);
    }
});

export const updateBookingRequestHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookingId = Number(req.params.id);
        // console.log(req.files);
        const images = req.files ? (req.files as Express.Multer.File[]).map((file) => file.originalname).join(",") : "Not specified";
        req.body.smallImages = images;
        const updatedbooking = await bookingService.updatebooking(bookingId, req.body);
        res.json(updatedbooking);
    } catch (error) {
        logger.error(`Update User Info Error: ${getErrorMessage(error)}`);
        next(error);
    }
});


function getErrorMessage(error: unknown): string {
    if (error instanceof Error) return error.message;
    return String(error);
}
