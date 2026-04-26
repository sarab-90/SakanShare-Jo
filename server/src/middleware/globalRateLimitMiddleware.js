import rateLimit from "express-rate-limit";
export const globalRateLimitMiddleware = rateLimit({
    windowMs: 60* 60 * 1000,
    max: 1000,
    message: {
        success: false, 
        message: 'Too many requests from this IP, please try again after an hour'
    },
    standardHeaders: true,
    legacyHeaders: false,
});