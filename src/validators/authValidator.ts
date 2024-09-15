// src/validators/authValidator.ts
import { body } from 'express-validator';

export const validateSignup = [
  body('id')
    .notEmpty()
    .withMessage('Identifier is required')
    .isString()
    .withMessage('Identifier must be a string'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('deviceId')
    .optional()
    .isString()
    .withMessage('Device ID must be a string'),
];

export const validateSignin = [
  body('id')
    .notEmpty()
    .withMessage('Identifier is required')
    .isString()
    .withMessage('Identifier must be a string'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  body('deviceId')
    .optional()
    .isString()
    .withMessage('Device ID must be a string'),
];
