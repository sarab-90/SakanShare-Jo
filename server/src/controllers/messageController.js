import {
  createMessage,
  getConversationHistory,
  markMessagesAsRead,
  getAdminInboxMessages,
  deleteMessageById,
  countUnreadMessages,
} from "../models/messageModel.js";
import { asyncHandler } from "../middleware/asyncHandlerMiddleware.js";
import { messageSchema } from "../validation/messageValidation.js";
import { insertNotification } from "../models/notificationModel.js";
// SEND MESSAGE
export const sendMessageController = asyncHandler(async (req, res) => {
  const { receiver_id, listing_id, message_text, conversation_id } = req.body;
  const sender_id = req.user.userid;

  try {
    const newMessage = await createMessage(
      sender_id,
      receiver_id,
      listing_id,
      message_text,
      conversation_id,
    );

    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: newMessage,
    });
    await insertNotification(
      receiver_id,
      "message",
      `New message from ${req.user.name}`,
      `/chat/${conversation_id}`,
    );
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error sending message",
      error: error.message,
    });
  }
});

// GET CONVERSATION HISTORY
export const getChatHistoryController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const messages = await getConversationHistory(id);
    if (messages.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No messages found in this conversation",
        messages: [],
      });
    }
    return res.status(200).json({ success: true, messages });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching chat history",
      error: error.message,
    });
  }
});
export const markAsReadController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userid;

  try {
    await markMessagesAsRead(id, userId);
    return res
      .status(200)
      .json({ success: true, message: "Messages marked as read" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await deleteMessageById(id);
    if (!deleted) return res.status(404).json({ message: "Message not found" });
    
    res.json({ success: true, message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get count of unread messages 
export const getUnreadMessagesCount = async (req, res) => {
    try {
        const count = await countUnreadMessages();

        res.status(200).json({
            success: true,
            unreadCount: count,
        });
    } catch (error) {
        console.error("Error fetching unread count:", error.message);
        res.status(500).json({
            success: false,
            message: "Error fetching unread messages count",
        });
    }
};

export const replyFromAdminController = asyncHandler(async (req, res) => {
  const { receiver_id, message_text, conversation_id, listing_id } = req.body;
  const admin_id = req.user.userid;

  try {
    const reply = await createMessage(
      admin_id,
      receiver_id,
      listing_id,
      message_text,
      conversation_id
    );
    await insertNotification(
      receiver_id,
      "message",
      `You have a new reply from SakanShare Admin`,
      `/chat/${conversation_id}`
    );
    return res.status(201).json({
      success: true,
      message: "Admin reply sent successfully",
      data: reply,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error sending admin reply",
      error: error.message,
    });
  }
});


export const getAdminInboxController = asyncHandler(async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ 
      success: false, 
      message: "Access denied. Admins only." 
    });
  }
  const adminId = req.user.userid;

  try {
    const messages = await getAdminInboxMessages(adminId);
    return res.status(200).json({ 
      success: true, 
      count: messages.length, 
      data: messages 
    });

  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      message: "Error fetching admin inbox", 
      error: error.message 
    });
  }
});