import joi from "joi";

export const messageSchema = joi.object({
  receiver_id: joi.number().integer().required().messages({
    "number.base": "Receiver ID must be a number",
    "any.required": "Receiver ID is required",
  }),
  message_text: joi.string().min(1).max(1000).required().messages({
    "string.empty": "Message text cannot be empty",
    "string.min": "Message must contain at least 1 character",
    "string.max": "Message must be less than 1000 characters",
    "string.required": "Message text is required",
  }),
  listing_id: joi.number().integer().allow(null).optional(),
  conversation_id: joi.number().integer().allow(null).optional(),
});