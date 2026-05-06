import express from "express";
import {
  sendMatchRequest,
  getMySentMatchRequests,
  getMyReceivedMatchRequests,
  changeMatchRequestStatus,
  getMatchesController,
} from "../controllers/userMatchRequestController.js";

import { protect } from "../middleware/protectMiddleware.js";
// import { validate } from "../middleware/validateMiddleware.js"; // فعليه إذا كنتِ تستخدمينه

const router = express.Router();
router.post("/", protect, sendMatchRequest);
router.get("/sent", protect, getMySentMatchRequests);
router.get("/received", protect, getMyReceivedMatchRequests);
router.get("/discover", protect, getMatchesController); 


router.patch("/:request_id", protect, changeMatchRequestStatus);

export default router;