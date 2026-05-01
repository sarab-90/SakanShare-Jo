import {register, login, logout, currentUser, changePasswordController} from '../controllers/authController.js';
import {registerSchema, loginSchema} from '../validation/userValidation.js';
import {validate} from '../middleware/validateMiddleware.js';
import {authRateLimitMiddleware} from '../middleware/authRateLimitMiddleware.js';
import {protect} from '../middleware/protectMiddleware.js';

import express from 'express';
const router = express.Router();

router.post('/auth/register', validate(registerSchema), authRateLimitMiddleware, register);
router.post('/auth/login', validate(loginSchema), authRateLimitMiddleware, login);
router.post('/auth/logout', logout);
router.get('/auth/me', protect, currentUser);
router.put('/auth/change-password', protect, changePasswordController);


export default router;
