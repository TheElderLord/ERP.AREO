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





function getErrorMessage(error: unknown): string {
    if (error instanceof Error) return error.message;
    return String(error);
}
