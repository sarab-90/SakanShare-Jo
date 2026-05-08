import express from "express";
import { getMyNotificationsController, markReadController } from "../controllers/notificationController.js";
import { protect } from "../middleware/protectMiddleware.js";

const router = express.Router();

router.get("/", protect, getMyNotificationsController);
router.patch("/read/:id", protect, markReadController);

export default router;