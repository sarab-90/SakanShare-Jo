import Joi from 'joi';

export const createRequestSchema = Joi.object({
    listing_id: Joi.number()
        .integer()
        .min(1)
        .required()
        .messages({
            'number.base': 'Listing ID must be a number',
            'number.integer': 'Listing ID must be an integer',
            'number.min': 'Listing ID must be a positive number',
            'any.required': 'Listing ID is required',
}),
    message: Joi.string()
        .max(1000)
        .allow(null, '')
        .messages({
            'string.max': 'Message is too long (max 1000 chars)',
            'string.base': 'Message must be a string',
        }),
});