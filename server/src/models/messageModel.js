import { pool } from "../config/db.js";

export const createMessage = async (sender_id, receiver_id, listing_id, message_text, conversation_id) => {
  const result = await pool.query(
    `INSERT INTO messages (sender_id, receiver_id, listing_id, message_text, conversation_id)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [sender_id, receiver_id, listing_id, message_text, conversation_id]
  );
  return result.rows[0];
};

export const getConversationHistory = async (conversation_id) => {
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
export const markMessagesAsRead = async (conversation_id, receiver_id) => {
  const result = await pool.query(
    `UPDATE messages 
     SET is_read = true 
     WHERE conversation_id = $1 AND receiver_id = $2 AND is_read = false
     RETURNING *`,
    [conversation_id, receiver_id]
  );
  return result.rows;
};

export const getAdminInboxMessages = async (adminId) => {
  const result = await pool.query(
    `SELECT m.*, u.name as sender_name, u.email as sender_email
     FROM messages m
     JOIN users u ON m.sender_id = u.userid
     WHERE m.receiver_id = $1
     ORDER BY m.created_at DESC`,
    [adminId]
  );
  return result.rows;
};

export const deleteMessageById = async (message_id) => {
  const result = await pool.query(
    `DELETE FROM messages WHERE message_id = $1 RETURNING *`,
    [message_id]
  );
  return result.rows[0];
};

export const countUnreadMessages = async () => {
    const result = await pool.query(
        "SELECT COUNT(*) FROM messages WHERE is_read = false"
    );
    return parseInt(result.rows[0].count);
};