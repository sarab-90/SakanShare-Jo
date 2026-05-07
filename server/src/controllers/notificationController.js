import {
  getNotificationsByUserId,
  markNotificationAsRead,
} from "../models/notificationModel.js";
import { asyncHandler } from "../middleware/asyncHandlerMiddleware.js";

// جلب إشعارات المستخدم الحالي
export const getMyNotificationsController = asyncHandler(async (req, res) => {
  const userId = req.user.userid;
  try {
    const notifications = await getNotificationsByUserId(userId);
    return res.status(200).json({
      success: true,
      notifications,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching notifications",
      error: error.message,
    });
  }
});

// تحديث إشعار واحد كـ "مقروء"
export const markReadController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userid;
  try {
    await markNotificationAsRead(id, userId);
    return res
      .status(200)
      .json({ success: true, message: "Notification marked as read" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});
