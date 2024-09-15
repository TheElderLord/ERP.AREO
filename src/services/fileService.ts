// src/services/fileService.ts
import path from 'path';
import fs from 'fs';
import File from '../models/File';

class FileService {
  private uploadDir = path.join(__dirname, '../../uploads');

  async uploadFile(fileData: Express.Multer.File, userId: number) {
    const { originalname, mimetype, size, filename } = fileData;
    const extension = path.extname(originalname);

    // Save file record to database
    await File.create({
      userId,
      name: filename,
      extension,
      mimeType: mimetype,
      size,
    });

    return { message: 'File uploaded successfully' };
  }

  async listFiles(userId: number, listSize: number, offset: number) {
    const files = await File.findAll({
      where: { userId },
      limit: listSize,
      offset,
    });
    return files;
  }

  async getFileInfo(userId: number, fileId: number) {
    const file = await File.findOne({
      where: { id: fileId, userId },
    });
    if (!file) {
      throw new Error('File not found');
    }
    return file;
  }

  async downloadFile(userId: number, fileId: number) {
    const file = await this.getFileInfo(userId, fileId);
    const filePath = path.join(this.uploadDir, file.name);
    if (!fs.existsSync(filePath)) {
      throw new Error('File does not exist on server');
    }
    return { filePath, fileName: file.name };
  }

  async deleteFile(userId: number, fileId: number) {
    const file = await this.getFileInfo(userId, fileId);
    const filePath = path.join(this.uploadDir, file.name);

    // Delete file from filesystem
    fs.unlinkSync(filePath);

    // Delete file record from database
    await file.destroy();

    return { message: 'File deleted successfully' };
  }

  async updateFile(userId: number, fileId: number, newFileData: Express.Multer.File) {
    const file = await this.getFileInfo(userId, fileId);
    const oldFilePath = path.join(this.uploadDir, file.name);

    // Delete old file from filesystem
    fs.unlinkSync(oldFilePath);

    const { originalname, mimetype, size, filename } = newFileData;
    const extension = path.extname(originalname);

    // Update file record in database
    await file.update({
      name: filename,
      extension,
      mimeType: mimetype,
      size,
      uploadDate: new Date(),
    });

    return { message: 'File updated successfully' };
  }
}

export default new FileService();
