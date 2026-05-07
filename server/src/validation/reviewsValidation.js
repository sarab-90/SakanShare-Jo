import joi from "joi";

export const reviewSchema = joi.object({
  reviewed_user_id: joi.number().integer().required().messages({
    "number.base": "User ID must be a number",
    "any.required": "User ID to be reviewed is required",
  }),
  rating: joi.number().integer().min(1).max(5).required().messages({
    "number.min": "Rating must be at least 1 star",
    "number.max": "Rating cannot exceed 5 stars",
    "any.required": "Rating is required",
  }),
  comment: joi.string().max(500).allow("").optional().messages({
    "string.max": "Comment must be less than 500 characters",
  }),
});