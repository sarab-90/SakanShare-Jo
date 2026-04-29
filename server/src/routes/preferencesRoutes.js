import { createUserPreferences, getUserPreferences, updateUserPreferences } from "../controllers/preferencesController.js";
import { preferencesSchema } from "../validation/preferencesValidation.js";
import { validate } from "../middleware/validateMiddleware.js";
import { protect } from "../middleware/protectMiddleware.js";

import express from "express";
const router = express.Router();

router.post("/preferences", protect, validate(preferencesSchema), createUserPreferences);
router.get("/preferences", protect, getUserPreferences);
router.put("/preferences", protect, validate(preferencesSchema), updateUserPreferences);

export default router;