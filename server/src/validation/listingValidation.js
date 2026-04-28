import joi from "joi";
// validation listing schemas
export const listingSchema = joi.object({
    title: joi.string().min(5).max(255).required().messages({
        "string.min": "Title must be at least 5 characters",
        "string.max": "Title must be less than 255 characters",
        "string.empty": "Title is required",
        "string.required": "Title is required",
    }),
    description: joi.string().max(5000).messages({
        "string.max": "Description must be less than 5000 characters",
    }),
    city: joi.string().max(50).required().messages({
        "string.max": "City must be less than 50 characters",
        "string.empty": "City is required",
        "string.required": "City is required",
    }),
    area: joi.string().max(100).required().messages({
        "string.max": "Area must be less than 100 characters",
        "string.empty": "Area is required",
        "string.required": "Area is required",
    }),
    price: joi.number().min(0).required().messages({
        "number.min": "Price must be a positive number",
        "number.base": "Price must be a number",
        "number.required": "Price is required",
    }),
    images: joi.array().items(joi.string()).default([]).messages({
        "array.base": "Images must be an array",
        "string.base": "Each image must be a string",
    }),
    currency: joi.string().max(10).default("JOD").messages({
        "string.max": "Currency must be less than 10 characters",
    }),
    is_shared: joi.boolean().default(true),
    rooms_count: joi.number().integer().min(1).required().messages({
        "number.integer": "Rooms count must be an integer",
        "number.min": "Rooms count must be at least 1",
        "number.empty": "Rooms count is required",
        "number.required": "Rooms count is required",
    }),
    bathrooms_count: joi.number().integer().min(1).required().messages({
        "number.integer": "Bathrooms count must be an integer",
        "number.min": "Bathrooms count must be at least 1",
        "number.empty": "Bathrooms count is required",
        "number.required": "Bathrooms count is required",
    }),
    furnished: joi.boolean().default(false),
    has_wifi: joi.boolean().default(true),
    has_parking: joi.boolean().default(false),
    has_kitchen: joi.boolean().default(true),
    has_washing_machine: joi.boolean().default(false),
    max_occupants: joi.number().integer().min(1).required().messages({
        "number.integer": "Max occupants must be an integer",
        "number.min": "Max occupants must be at least 1",
        "number.empty": "Max occupants is required",
        "number.required": "Max occupants is required",
    }),
    gender_allowed: joi.string().valid ("male", "female", "any").default("any").messages({
        "string.valid": "Gender allowed must be either male, female, or any",  
    }),
    latitude: joi.number().min(-90).max(90).messages({
        "number.min": "Latitude must be greater than or equal to -90",
        "number.max": "Latitude must be less than or equal to 90",
    }),
    longitude: joi.number().min(-180).max(180).messages({
        "number.min": "Longitude must be greater than or equal to -180",
        "number.max": "Longitude must be less than or equal to 180",
    }),
    is_available: joi.boolean().default(true),  
});
