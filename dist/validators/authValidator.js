"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSignin = exports.validateSignup = void 0;
// src/validators/authValidator.ts
const express_validator_1 = require("express-validator");
exports.validateSignup = [
    (0, express_validator_1.body)('id')
        .notEmpty()
        .withMessage('Identifier is required')
        .isString()
        .withMessage('Identifier must be a string'),
    (0, express_validator_1.body)('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    (0, express_validator_1.body)('deviceId')
        .optional()
        .isString()
        .withMessage('Device ID must be a string'),
];
exports.validateSignin = [
    (0, express_validator_1.body)('id')
        .notEmpty()
        .withMessage('Identifier is required')
        .isString()
        .withMessage('Identifier must be a string'),
    (0, express_validator_1.body)('password')
        .notEmpty()
        .withMessage('Password is required'),
    (0, express_validator_1.body)('deviceId')
        .optional()
        .isString()
        .withMessage('Device ID must be a string'),
];
