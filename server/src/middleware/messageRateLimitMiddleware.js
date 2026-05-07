import rateLimit from 'express-rate-limit';

export const messageLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 دقيقة
  max: 50,
  message: { success: false, message: "Too many messages sent, please try again later" }
});