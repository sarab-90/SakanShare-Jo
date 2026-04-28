import joi from 'joi';
// validation register schemas
export const registerSchema = joi.object({
    name: joi.string().min(3).max(255).required().messages({
        "string.min": "Name must be at least 3 characters",
        "string.max": "Name must be less than 255 characters",
        "string.empty": "Name is required",
        "string.required": "Name is required",
    }),
    email: joi.string().email().min(8).max(255).required().messages({
        "string.email": "Email must be a valid email address",
        "string.min": "Email must be at least 8 characters",
        "string.max": "Email must be less than 255 characters",
        "string.empty": "Email is required",
        "string.required": "Email is required",
    }),
    password: joi.string().min(6).max(1024)
    .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    )
    .required()
    .messages({
        "string.min": "Password must be at least 6 characters",
        "string.max": "Password must be less than 1024 characters",
        "string.empty": "Password is required",
        "string.pattern": "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        "string.required": "Password is required",
}),
    phone: joi.string().min(10).max(15).required().messages({
        "string.min": "Phone number must be at least 10 characters",
        "string.max": "Phone number must be less than 15 characters",
        "string.empty": "Phone number is required",
        "string.required": "Phone number is required",
    }),
    role: joi
    .string()
    .valid("user", "admin", "landlord")
    .default("user")
    .required()
    .messages({
        "string.valid": "Role must be either user, admin, or landlord",
        "string.empty": "Role is required",
        "string.required": "Role is required",
    }),
});
// validation login schemas
export const loginSchema = joi.object({
    email: joi.string().email().min(6).max(255).required().messages({
        "string.email": "Email must be a valid email address",
        "string.min": "Email must be at least 6 characters",
        "string.max": "Email must be less than 255 characters",
        "string.empty": "Email is required",
        "string.required": "Email is required",
    }),
    password: joi
    .string()
    .min(6)
    .max(1024)
    .pattern(
         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .required()
    .messages({
        "string.min": "Password must be at least 6 characters",
        "string.max": "Password must be less than 1024 characters",
        "string.empty": "Password is required",
        "string.pattern": 
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        "string.required": "Password is required",
    }),
});
