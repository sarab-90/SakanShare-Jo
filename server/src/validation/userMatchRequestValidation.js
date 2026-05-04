import Joi from "joi";

export const createMatchRequestSchema = Joi.object({
  receiver_id: Joi.number()
    .integer()
    .required()
    .messages({
      "number.base": "Receiver ID must be a number",
      "any.required": "Receiver ID is required",
    }),

  message: Joi.string()
    .max(300)
    .allow("", null)
    .messages({
      "string.max": "Message cannot exceed 300 characters",
    }),
});

export const updateMatchRequestSchema = Joi.object({
  status: Joi.string()
    .valid("accepted", "rejected", "canceled")
    .required()
    .messages({
      "any.only": "Status must be accepted, rejected, or canceled",
    }),
});