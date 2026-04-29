import Joi from 'joi';

export const preferencesSchema = Joi.object({
    gender: Joi.string()
        .valid('male', 'female', 'any')
        .messages({
            'any.only': 'Gender must be one of: male, female, or any',
        }),

    min_age: Joi.number()
        .integer()
        .min(17)
        .max(100)
        .messages({
            'number.base': 'Minimum age must be a number',
            'number.min': 'Minimum age must be at least 17',
        }),

    max_age: Joi.number()
        .integer()
        .min(Joi.ref('min_age'))
        .max(100)
        .messages({
            'number.base': 'Maximum age must be a number',
            'number.max': 'Maximum age is invalid',
            'number.min': 'Max age must be greater than or equal to min age',
        }),

    smoking: Joi.boolean()
        .messages({
            'boolean.base': 'Smoking field must be true or false',
        }),

    sleep_time: Joi.string()
        .max(50)
        .allow(null, '')
        .messages({
            'string.max': 'Sleep time description is too long (max 50 chars)',
        }),

    cleanliness: Joi.string()
        .max(50)
        .allow(null, '')
        .messages({
            'string.max': 'Cleanliness description is too long (max 50 chars)',
        }),

    noise_tolerance: Joi.string()
        .valid('low', 'medium', 'high')
        .allow(null, '')
        .messages({
            'any.only': 'Noise tolerance must be: low, medium, or high',
        }),

    pets_allowed: Joi.boolean()
        .allow(null).messages({
            'boolean.base': 'Pets allowed field must be true or false',
        }),

    guest_policy: Joi.string()
        .max(50)
        .allow(null, '').messages({
            'string.max': 'Guest policy description is too long (max 50 chars)',
        }),

    additional_notes: Joi.string()
        .max(500)
        .allow(null, '')
        .messages({
            'string.max': 'Additional notes cannot exceed 500 characters',
        }),

    budget: Joi.number()
        .precision(2)
        .positive()
        .min(0)
        .max(1000000)
        .messages({
            'number.base': 'Budget must be a number',
            'number.positive': 'Budget must be a positive value',
            'number.min': 'Budget must be a non-negative value',
            'number.max': 'Budget is too high',
        })
}).min(1)
        .messages({
            'object.min': 'You must update at least one preference field',
        }) 