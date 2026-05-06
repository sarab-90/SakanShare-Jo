import { pool } from "../config/db.js";

// إرسال رسالة جديدة
export const createMessage = async (sender_id, receiver_id, listing_id, message_text, conversation_id) => {
  const result = await pool.query(
    `INSERT INTO messages (sender_id, receiver_id, listing_id, message_text, conversation_id)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [sender_id, receiver_id, listing_id, message_text, conversation_id]
  );
  return result.rows[0];
};

// جلب الرسائل الخاصة بمحادثة معينة
export const getMessagesByConversation = async (conversation_id) => {
  const result = await pool.query(
    `SELECT m.*, u.name as sender_name 
     FROM messages m
     JOIN users u ON m.sender_id = u.userid
     WHERE m.conversation_id = $1
     ORDER BY m.created_at ASC`,
    [conversation_id]
  );
  return result.rows;
};

// جلب قائمة المحادثات لمستخدم معين (لعرضها في Inbox)
export const getUserConversations = async (userid) => {
  const result = await pool.query(
    `SELECT DISTINCT ON (conversation_id) * FROM messages 
     WHERE sender_id = $1 OR receiver_id = $1
     ORDER BY conversation_id, created_at DESC`,
    [userid]
  );
  return result.rows;
};