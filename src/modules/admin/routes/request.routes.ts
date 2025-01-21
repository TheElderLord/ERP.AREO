// routes/roomRoutes.ts
import { Router } from 'express';
import { createRequestHandler, deleteRequestHandler, getRequestByIdHandler, getRequestsRequestHandler } from '../controllers/request.controller';

const router = Router();

// 'images' here is the field name in the form-data, you expect multiple files
router.route('/').post( createRequestHandler)
.get(getRequestsRequestHandler);

router.route('/:id').get(getRequestByIdHandler)
.delete( deleteRequestHandler);

export default router;
