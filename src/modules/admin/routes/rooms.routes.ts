// routes/roomRoutes.ts
import { Router } from 'express';
import { createRoomRequestHandler, deleteRoomRequestHandler, getRoomByIdHandler, getRoomsRequestHandler, updateRoomRequestHandler } from '../controllers/rooms.controller';
import { upload } from '../../../config/multerConfig';

const router = Router();

// 'images' here is the field name in the form-data, you expect multiple files
router.route('/').post( upload.array('images', 10), createRoomRequestHandler)
.get(getRoomsRequestHandler);

router.route('/:id').get(getRoomByIdHandler).
put(upload.array('images', 10), updateRoomRequestHandler)
.delete( deleteRoomRequestHandler);

export default router;
