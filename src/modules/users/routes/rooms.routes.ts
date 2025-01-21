// routes/roomRoutes.ts
import { Router } from 'express';
// import { createRoomRequestHandler, deleteRoomRequestHandler, getRoomByIdHandler, getRoomsRequestHandler, updateRoomRequestHandler } from '../controllers/rooms.controller';
import { upload } from '../../../config/multerConfig';
import authMiddleware from '../../../middlewares/auth.middleware';

const router = Router();

// // 'images' here is the field name in the form-data, you expect multiple files
// router.route('/').post( upload.array('images', 10),authMiddleware, createRoomRequestHandler)
// .get(authMiddleware,getRoomsRequestHandler);

// router.route('/:id').get(authMiddleware,getRoomByIdHandler).
// put(upload.array('images', 10),authMiddleware, updateRoomRequestHandler)
// .delete(authMiddleware, deleteRoomRequestHandler);

export default router;
