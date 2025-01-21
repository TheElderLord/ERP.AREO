// routes/roomRoutes.ts
import { Router } from 'express';
import { createBookingRequestHandler, deleteBookingRequestHandler, getBookingByIdHandler, getBookingsRequestHandler, updateBookingRequestHandler } from '../controllers/booking.controller';

const router = Router();

// 'images' here is the field name in the form-data, you expect multiple files
router.route('/').post( createBookingRequestHandler)
.get(getBookingsRequestHandler);

router.route('/:id').get(getBookingByIdHandler)
.put( updateBookingRequestHandler)
.delete( deleteBookingRequestHandler);

export default router;
