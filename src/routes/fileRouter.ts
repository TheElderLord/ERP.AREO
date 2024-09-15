import { Router } from 'express';
import * as fileController from '../controllers/fileController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.post('/upload', authMiddleware, fileController.uploadFile);
router.get('/list', authMiddleware, fileController.listFiles);
// Add other routes similarly

export default router;
