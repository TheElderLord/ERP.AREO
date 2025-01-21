// routes/roomRoutes.ts
import { Router } from 'express';
import {   getBookingByIdHandler, getBookingsRequestHandler } from '../controllers/booking.controller';

const router = Router();

// 'images' here is the field name in the form-data, you expect multiple files
router.route('/').get(getBookingsRequestHandler);

router.route('/:id').get(getBookingByIdHandler)


export default router;
