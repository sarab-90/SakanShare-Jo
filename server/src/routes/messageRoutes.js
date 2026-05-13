import { 
    sendMessageController, 
    getChatHistoryController ,
    markAsReadController,
    getAdminInboxController,
    deleteMessage,
    getUnreadMessagesCount,
    replyFromAdminController,
} from "../controllers/messageController.js";
import { protect } from "../middleware/protectMiddleware.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";
import { messageLimiter } from "../middleware/messageRateLimitMiddleware.js";
import { validate } from "../middleware/validateMiddleware.js";
import { messageSchema } from "../validation/messageValidation.js";

import express from "express";
const router = express.Router();

router.get("/admin/inbox", protect, authorizeRoles("admin"), getAdminInboxController);

router.post("/send", protect, authorizeRoles("admin", "user", "landlord"), validate(messageSchema) ,sendMessageController);

router.get("/getChat/:id", protect, authorizeRoles("admin", "user", "landlord"), getChatHistoryController);

router.patch("/mark/:id", protect, markAsReadController);

router.get("/unread-count", protect, authorizeRoles("admin"), getUnreadMessagesCount);

router.post("/admin/reply", protect, authorizeRoles("admin"), replyFromAdminController);

router.delete("/:id", protect, authorizeRoles("admin","user", "landlord"), deleteMessage);


export default router;