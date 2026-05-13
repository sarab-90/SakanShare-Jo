import Joi from "joi";

export const createRoleRequestSchema = Joi.object({
  phone: Joi.string()
    .min(8)
    .max(20)
    .required()
    .messages({
      "string.empty": "Phone is required",
      "any.required": "Phone is required",
    }),

  city: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages({
      "string.empty": "City is required",
      "any.required": "City is required",
    }),

  message: Joi.string()
    .allow("", null)
    .max(500)
    .messages({
      "string.max": "Message is too long",
    }),
});