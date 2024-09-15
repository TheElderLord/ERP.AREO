// src/routes/fileRoutes.ts
import { Router } from 'express';
import {
  uploadFile,
  listFiles,
  getFileInfo,
  downloadFile,
  deleteFile,
  updateFile,
} from '../controllers/fileController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

/**
 * @route   GET /files
 * @desc    List files with pagination
 * @access  Private
 */
router.get('/files', authMiddleware, listFiles);

/**
 * @route   POST /files
 * @desc    Upload a new file
 * @access  Private
 */
router.post('/files', authMiddleware, uploadFile);

/**
 * @route   GET /files/:id
 * @desc    Get file information by ID
 * @access  Private
 */
router.get('/files/:id', authMiddleware, getFileInfo);

/**
 * @route   GET /files/:id/download
 * @desc    Download a file by ID
 * @access  Private
 */
router.get('/files/:id/download', authMiddleware, downloadFile);

/**
 * @route   PUT /files/:id
 * @desc    Update an existing file
 * @access  Private
 */
router.put('/files/:id', authMiddleware, updateFile);

/**
 * @route   DELETE /files/:id
 * @desc    Delete a file by ID
 * @access  Private
 */
router.delete('/files/:id', authMiddleware, deleteFile);

export default router;
