import {createRequestController, 
    acceptRequestController,
    rejectRequestController,
    getRequestsForOwnerController,
    getMyRequestsController,
} from "../controllers/requestsController.js";
import {createRequestSchema} from "../validation/requestsValidation.js";
import { validate } from "../middleware/validateMiddleware.js";
import { protect } from "../middleware/protectMiddleware.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";

import express from "express";
const router = express.Router();

router.post("/request",protect, authorizeRoles("user"), validate(createRequestSchema) ,createRequestController);
router.put("/request/accept/:request_id", protect, authorizeRoles("admin", "landlord"), acceptRequestController);
router.put( "/request/reject/:request_id", protect, authorizeRoles("admin", "landlord"), rejectRequestController);
router.get("/request/owner", protect, authorizeRoles("admin", "landlord"), getRequestsForOwnerController);
router.get( "/request/my", protect, authorizeRoles("user"), getMyRequestsController);

export default router;
