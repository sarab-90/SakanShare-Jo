import {
  createMessage,
  getConversationHistory,
  markMessagesAsRead,
} from "../models/messageModel.js";
import { asyncHandler } from "../middleware/asyncHandlerMiddleware.js";
import { messageSchema } from "../validation/messageValidation.js";

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
