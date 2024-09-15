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
exports.listFiles = exports.uploadFile = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const File_1 = __importDefault(require("../models/File"));
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
        if (!file)
            return next({ status: 400, message: 'No file uploaded' });
        try {
            const { originalname, mimetype, size, filename } = file;
            const extension = path_1.default.extname(originalname);
            yield File_1.default.create({
                userId: req.user.id,
                name: filename,
                extension,
                mimeType: mimetype,
                size,
            });
            res.status(201).json({ message: 'File uploaded successfully' });
        }
        catch (error) {
            next(error);
        }
    })),
];
exports.listFiles = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const listSize = parseInt(req.query.list_size) || 10;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * listSize;
    try {
        const files = yield File_1.default.findAll({
            where: { userId: req.user.id },
            limit: listSize,
            offset,
        });
        res.json({ files });
    }
    catch (error) {
        next(error);
    }
}));
// Implement getFileInfo, downloadFile, deleteFile, updateFile similarly
