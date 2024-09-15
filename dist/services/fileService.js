"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/services/fileService.ts
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const File_1 = __importDefault(require("../models/File"));
class FileService {
    constructor() {
        this.uploadDir = path_1.default.join(__dirname, '../../uploads');
    }
    uploadFile(fileData, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { originalname, mimetype, size, filename } = fileData;
            const extension = path_1.default.extname(originalname);
            // Save file record to database
            yield File_1.default.create({
                userId,
                name: filename,
                extension,
                mimeType: mimetype,
                size,
            });
            return { message: 'File uploaded successfully' };
        });
    }
    listFiles(userId, listSize, offset) {
        return __awaiter(this, void 0, void 0, function* () {
            const files = yield File_1.default.findAll({
                where: { userId },
                limit: listSize,
                offset,
            });
            return files;
        });
    }
    getFileInfo(userId, fileId) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = yield File_1.default.findOne({
                where: { id: fileId, userId },
            });
            if (!file) {
                throw new Error('File not found');
            }
            return file;
        });
    }
    downloadFile(userId, fileId) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = yield this.getFileInfo(userId, fileId);
            const filePath = path_1.default.join(this.uploadDir, file.name);
            if (!fs_1.default.existsSync(filePath)) {
                throw new Error('File does not exist on server');
            }
            return { filePath, fileName: file.name };
        });
    }
    deleteFile(userId, fileId) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = yield this.getFileInfo(userId, fileId);
            const filePath = path_1.default.join(this.uploadDir, file.name);
            // Delete file from filesystem
            fs_1.default.unlinkSync(filePath);
            // Delete file record from database
            yield file.destroy();
            return { message: 'File deleted successfully' };
        });
    }
    updateFile(userId, fileId, newFileData) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = yield this.getFileInfo(userId, fileId);
            const oldFilePath = path_1.default.join(this.uploadDir, file.name);
            // Delete old file from filesystem
            fs_1.default.unlinkSync(oldFilePath);
            const { originalname, mimetype, size, filename } = newFileData;
            const extension = path_1.default.extname(originalname);
            // Update file record in database
            yield file.update({
                name: filename,
                extension,
                mimeType: mimetype,
                size,
                uploadDate: new Date(),
            });
            return { message: 'File updated successfully' };
        });
    }
}
exports.default = new FileService();
