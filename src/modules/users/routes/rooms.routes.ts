// routes/roomRoutes.ts
import { Router } from 'express';
import {  getRoomByIdHandler, getRoomsRequestHandler } from '../controllers/rooms.controller';
import { upload } from '../../../config/multerConfig';

const router = Router();

// 'images' here is the field name in the form-data, you expect multiple files
router.route('/')
.get(getRoomsRequestHandler);

router.route('/:id').get(getRoomByIdHandler)

export default router;
