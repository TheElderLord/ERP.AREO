// routes/roomRoutes.ts
import { Router } from 'express';
import {  createRequestHandler } from '../controllers/request.controller';

const router = Router();

// 'images' here is the field name in the form-data, you expect multiple files
router.route('/').post(createRequestHandler);
export default router;
