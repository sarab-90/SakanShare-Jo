import {register, login, logout, currentUser} from '../controllers/authController.js';
import {registerSchema, loginSchema} from '../validation/userValidation.js';
import {validate} from '../middleware/validateMiddleware.js';
import {authRateLimitMiddleware} from '../middleware/authRateLimitMiddleware.js';
import {protect} from '../middleware/protectMiddleware.js';

import express from 'express';
const router = express.Router();

router.post('/register', validate(registerSchema), authRateLimitMiddleware, register);
router.post('/login', validate(loginSchema), authRateLimitMiddleware, login);
router.post('/logout', logout);
router.get('/me', protect, currentUser)

export default router;
