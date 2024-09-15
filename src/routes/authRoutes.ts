import { Router } from 'express';
import * as authController from '../controllers/authController';
import { signupValidation } from '../validators/authValidar';

const router = Router();

router.post('/signup', signupValidation, authController.signup);
router.post('/signin', signupValidation, authController.signin);
router.post('/signin/new_token', authController.refreshToken);

export default router;
