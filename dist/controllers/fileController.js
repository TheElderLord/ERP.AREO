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
exports.updateFile = exports.deleteFile = exports.downloadFile = exports.getFileInfo = exports.listFiles = exports.uploadFile = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const fileService_1 = __importDefault(require("../services/fileService"));
const logger_1 = __importDefault(require("../utils/logger"));
const storage = multer_1.default.diskStorage({
    destination: './uploads/',
    filename: (_req, file, cb) => {
        cb(null, Date.now() + path_1.default.extname(file.originalname)); // Unique filename
    },
});
const upload = (0, multer_1.default)({ storage });
exports.uploadFile = [
    upload.single('file'),
    (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const file = req.file;
        if (!file) {
            res.status(400).json({ message: 'No file uploaded' });
            return;
        }
        try {
            const userId = req.user.id;
            const result = yield fileService_1.default.uploadFile(file, userId);
            res.status(201).json(result);
        }
        catch (error) {
            logger_1.default.error(`File Upload Error: ${getErrorMessage(error)}`);
            next(error);
        }
    })),
];
exports.listFiles = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const listSize = parseInt(req.query.list_size) || 10;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * listSize;
    try {
        const userId = req.user.id;
        const files = yield fileService_1.default.listFiles(userId, listSize, offset);
        res.json({ files });
    }
    catch (error) {
        logger_1.default.error(`List Files Error: ${getErrorMessage(error)}`);
        next(error);
    }
}));
exports.getFileInfo = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const fileId = parseInt(req.params.id);
    try {
        const userId = req.user.id;
        const file = yield fileService_1.default.getFileInfo(userId, fileId);
        res.json(file);
    }
    catch (error) {
        logger_1.default.error(`Get File Info Error: ${getErrorMessage(error)}`);
        next(error);
    }
}));
exports.downloadFile = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const fileId = parseInt(req.params.id);
    try {
        const userId = req.user.id;
        const { filePath, fileName } = yield fileService_1.default.downloadFile(userId, fileId);
        res.download(filePath, fileName);
    }
    catch (error) {
        logger_1.default.error(`Download File Error: ${getErrorMessage(error)}`);
        next(error);
    }
}));
exports.deleteFile = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const fileId = parseInt(req.params.id);
    try {
        const userId = req.user.id;
        const result = yield fileService_1.default.deleteFile(userId, fileId);
        res.json(result);
    }
    catch (error) {
        logger_1.default.error(`Delete File Error: ${getErrorMessage(error)}`);
        next(error);
    }
}));
exports.updateFile = [
    upload.single('file'),
    (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const fileId = parseInt(req.params.id);
        const newFile = req.file;
        if (!newFile) {
            res.status(400).json({ message: 'No file uploaded' });
            return;
        }
        try {
            const userId = req.user.id;
            const result = yield fileService_1.default.updateFile(userId, fileId, newFile);
            res.json(result);
        }
        catch (error) {
            logger_1.default.error(`Update File Error: ${getErrorMessage(error)}`);
            next(error);
        }
    })),
];
function getErrorMessage(error) {
    if (error instanceof Error)
        return error.message;
    return String(error);
}
