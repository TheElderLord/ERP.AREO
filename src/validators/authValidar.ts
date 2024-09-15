import { checkSchema } from 'express-validator';

export const signupValidation = checkSchema({
  id: {
    in: ['body'],
    isString: true,
    trim: true,
    notEmpty: {
      errorMessage: 'Identifier (email or phone) is required',
    },
    custom: {
      options: (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\+?[1-9]\d{1,14}$/; // E.164 format
        if (!emailRegex.test(value) && !phoneRegex.test(value)) {
          throw new Error('Identifier must be a valid email or phone number');
        }
        return true;
      },
    },
  },
  password: {
    in: ['body'],
    isString: true,
    isLength: {
      options: { min: 8 },
      errorMessage: 'Password must be at least 8 characters long',
    },
    matches: {
      options: /(?=.*[0-9])(?=.*[a-zA-Z])/,
      errorMessage: 'Password must contain both letters and numbers',
    },
  },
  deviceId: {
    in: ['body'],
    optional: true,
    isString: true,
  },
});

export const signinValidation = signupValidation;
