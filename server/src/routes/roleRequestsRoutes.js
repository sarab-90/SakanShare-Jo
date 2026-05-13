import express from "express";
import {
  createRoleRequestController,
  getAllRoleRequestsController,
  rejectRequest,
  acceptRequest,
  
} from "../controllers/roleRequestsController.js";

import { protect } from "../middleware/protectMiddleware.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";
import { validate } from "../middleware/validateMiddleware.js";

import {
  createRoleRequestSchema,
} from "../validation/roleRequestsValidation.js";

const router = express.Router();

router.post(
  "/role/request",
  protect,
  validate(createRoleRequestSchema),
  createRoleRequestController
);

router.get(
  "/role/requests",
  protect,
  authorizeRoles("admin"),
  getAllRoleRequestsController
);

router.put("/accept/:id", protect, authorizeRoles("admin"), acceptRequest);
router.put("/reject/:id", protect, authorizeRoles("admin"), rejectRequest);

export default router;