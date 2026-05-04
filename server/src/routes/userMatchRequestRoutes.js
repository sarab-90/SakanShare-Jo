import express from "express";
import {
  sendMatchRequest,
  getMySentMatchRequests,
  getMyReceivedMatchRequests,
  changeMatchRequestStatus,
} from "../controllers/userMatchRequestController.js";

import { protect } from "../middleware/protectMiddleware.js";
import { validate } from "../middleware/validateMiddleware.js";
const router = express.Router();

// CREATE
router.post("/", protect, sendMatchRequest);

// GET
router.get("/sent", protect, getMySentMatchRequests);
router.get("/received", protect, getMyReceivedMatchRequests);

// UPDATE
router.patch("/:request_id", protect, changeMatchRequestStatus);

export default router;