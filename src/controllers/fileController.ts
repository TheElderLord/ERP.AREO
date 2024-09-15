// src/controllers/fileController.ts
import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import path from 'path';
import asyncHandler from 'express-async-handler';
import fileService from '../services/fileService';
import logger from '../utils/logger';

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (_req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

export const uploadFile = [
  upload.single('file'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const file = req.file;

    if (!file) {
      res.status(400).json({ message: 'No file uploaded' });
      return;
    }

    try {
      const userId = req.user!.id;
      const result = await fileService.uploadFile(file, userId);
      res.status(201).json(result);
    } catch (error) {
      logger.error(`File Upload Error: ${getErrorMessage(error)}`);
      next(error);
    }
  }),
];

export const listFiles = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const listSize = parseInt(req.query.list_size as string) || 10;
  const page = parseInt(req.query.page as string) || 1;
  const offset = (page - 1) * listSize;

  try {
    const userId = req.user!.id;
    const files = await fileService.listFiles(userId, listSize, offset);
    res.json({ files });
  } catch (error) {
    logger.error(`List Files Error: ${getErrorMessage(error)}`);
    next(error);
  }
});

export const getFileInfo = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const fileId = parseInt(req.params.id);

  try {
    const userId = req.user!.id;
    const file = await fileService.getFileInfo(userId, fileId);
    res.json(file);
  } catch (error) {
    logger.error(`Get File Info Error: ${getErrorMessage(error)}`);
    next(error);
  }
});

export const downloadFile = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const fileId = parseInt(req.params.id);

  try {
    const userId = req.user!.id;
    const { filePath, fileName } = await fileService.downloadFile(userId, fileId);
    res.download(filePath, fileName);
  } catch (error) {
    logger.error(`Download File Error: ${getErrorMessage(error)}`);
    next(error);
  }
});

export const deleteFile = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const fileId = parseInt(req.params.id);

  try {
    const userId = req.user!.id;
    const result = await fileService.deleteFile(userId, fileId);
    res.json(result);
  } catch (error) {
    logger.error(`Delete File Error: ${getErrorMessage(error)}`);
    next(error);
  }
});

export const updateFile = [
  upload.single('file'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const fileId = parseInt(req.params.id);
    const newFile = req.file;

    if (!newFile) {
      res.status(400).json({ message: 'No file uploaded' });
      return;
    }

    try {
      const userId = req.user!.id;
      const result = await fileService.updateFile(userId, fileId, newFile);
      res.json(result);
    } catch (error) {
      logger.error(`Update File Error: ${getErrorMessage(error)}`);
      next(error);
    }
  }),
];

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}
