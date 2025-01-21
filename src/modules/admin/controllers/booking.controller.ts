// src/controllers/userController.ts
import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import logger from '../../../utils/logger';
import BookingService from '../services/booking.service';


export const getBookingsRequestHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookings = await BookingService.getAllBookings();
        res.json({
            msg: 'All bookings',
            data: bookings
        });

        // if (req.user) {
        //     logger.info(`User ${req.user.id} fetched all bookings`);
        // } else {
        //     logger.info('Unknown user fetched all bookings');
        // }
    } catch (error) {
        logger.error(`Get Booking Info Error: ${getErrorMessage(error)}`);
        next(error);
    }
});

export const getBookingByIdHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookId = Number(req.params.id);
        // const userService = new UserService(sequelize);
        // console.log(req.params)
        const user = await BookingService.getBookingById(bookId);
        res.json(user);
    } catch (error) {
        logger.error(`Get Booking Info Error: ${getErrorMessage(error)}`);
        next(error);
    }
});


export const createBookingRequestHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const images = req.files ? (req.files as Express.Multer.File[]).map((file) => file.originalname).join(",") : "Not specified";
        req.body.images = images;
        
        const createdbooking = await BookingService.createBooking(req.body);
        // const updatedUser = await userService.createUser();
        res.json(createdbooking);
    } catch (error) {
        logger.error(`Create Booking Error: ${getErrorMessage(error)}`);
        next(error);
    }
});

export const updateBookingRequestHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookingId = Number(req.params.id);
        // console.log(req.files);
        const images = req.files ? (req.files as Express.Multer.File[]).map((file) => file.originalname).join(",") : "Not specified";
        req.body.smallImages = images;
        const updatedbooking = await BookingService.updateBooking(bookingId, req.body);
        res.json(updatedbooking);
    } catch (error) {
        logger.error(`Update Booking Error: ${getErrorMessage(error)}`);
        next(error);
    }
});

export const deleteBookingRequestHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookingId = Number(req.params.id);
        const deletedbooking = await BookingService.deleteBooking(bookingId);
        res.json(deletedbooking);
    } catch (error) {
        logger.error(`Delete Booking Error: ${getErrorMessage(error)}`);
        next(error);
    }
});


function getErrorMessage(error: unknown): string {
    if (error instanceof Error) return error.message;
    return String(error);
}
