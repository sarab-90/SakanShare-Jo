import express from "express";

import {
  createUserPreferences,
  getUserPreferences,
  updateUserPreferences,
  getPreferencesStats,
} from "../controllers/preferencesController.js";

import { protect } from "../middleware/protectMiddleware.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";
import { validate } from "../middleware/validateMiddleware.js";
import { preferencesSchema } from "../validation/preferencesValidation.js";

const router = express.Router();

/* USER */
router.post(
  "/preferences",
  protect,
  validate(preferencesSchema),
  createUserPreferences,
);

router.get("/preferences", protect, getUserPreferences);

router.put(
  "/preferences",
  protect,
  validate(preferencesSchema),
  updateUserPreferences,
);

/* ADMIN */
router.get(
  "/admin/preferences/stats",
  protect,
  authorizeRoles("admin"),
  getPreferencesStats,
);

export default router;
