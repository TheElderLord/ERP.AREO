// routes/roomRoutes.ts
import { Router } from 'express';
import { createRoomRequestHandler, getRoomsRequestHandler, updateRoomRequestHandler } from '../controllers/rooms.controller';
import { upload } from '../../../config/multerConfig';
import { get } from 'config';

const router = Router();

// 'images' here is the field name in the form-data, you expect multiple files
router.route('/').post( upload.array('images', 10), createRoomRequestHandler)
.get(getRoomsRequestHandler);

router.route('/:id').put(upload.array('images', 10),updateRoomRequestHandler);

export default router;
