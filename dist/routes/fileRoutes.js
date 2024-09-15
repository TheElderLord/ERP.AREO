"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/fileRoutes.ts
const express_1 = require("express");
const fileController_1 = require("../controllers/fileController");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const router = (0, express_1.Router)();
/**
 * @route   GET /files
 * @desc    List files with pagination
 * @access  Private
 */
router.get('/file/list', authMiddleware_1.default, fileController_1.listFiles);
/**
 * @route   POST /files
 * @desc    Upload a new file
 * @access  Private
 */
router.post('/file/upload', authMiddleware_1.default, fileController_1.uploadFile);
/**
 * @route   GET /files/:id
 * @desc    Get file information by ID
 * @access  Private
 */
router.get('/file/:id', authMiddleware_1.default, fileController_1.getFileInfo);
/**
 * @route   GET /files/:id/download
 * @desc    Download a file by ID
 * @access  Private
 */
router.get('/file/download/:id', authMiddleware_1.default, fileController_1.downloadFile);
/**
 * @route   PUT /files/:id
 * @desc    Update an existing file
 * @access  Private
 */
router.put('/file/update/:id', authMiddleware_1.default, fileController_1.updateFile);
/**
 * @route   DELETE /files/:id
 * @desc    Delete a file by ID
 * @access  Private
 */
router.delete('/file/delete/:id', authMiddleware_1.default, fileController_1.deleteFile);
exports.default = router;
