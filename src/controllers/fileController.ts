import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import asyncHandler from 'express-async-handler';
import File from '../models/File';

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (_req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

export const uploadFile = [
  upload.single('file'),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const file = req.file;

    if (!file) return next({ status: 400, message: 'No file uploaded' });

    try {
      const { originalname, mimetype, size, filename } = file;
      const extension = path.extname(originalname);

      await File.create({
        userId: (req as any).user.id,
        name: filename,
        extension,
        mimeType: mimetype,
        size,
      });

      res.status(201).json({ message: 'File uploaded successfully' });
    } catch (error) {
      next(error);
    }
  }),
];

export const listFiles = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const listSize = parseInt(req.query.list_size as string) || 10;
  const page = parseInt(req.query.page as string) || 1;
  const offset = (page - 1) * listSize;

  try {
    const files = await File.findAll({
      where: { userId: (req as any).user.id },
      limit: listSize,
      offset,
    });

    res.json({ files });
  } catch (error) {
    next(error);
  }
});

// Implement getFileInfo, downloadFile, deleteFile, updateFile similarly
