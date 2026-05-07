import { pool } from "../config/db.js";

// جلب كل إشعارات المستخدم
export const getNotificationsByUserId = async (userId) => {
  const result = await pool.query(
    `SELECT * FROM notifications 
     WHERE user_id = $1 
     ORDER BY created_at DESC`,
    [userId]
  );
  return result.rows;
};

// تحديث الإشعار ليصبح مقروءاً
export const markNotificationAsRead = async (notificationId, userId) => {
  await pool.query(
    `UPDATE notifications SET is_read = true 
     WHERE id = $1 AND user_id = $2`,
    [notificationId, userId]
  );
};

//  مساعدة لإنشاء إشعار 
export const insertNotification = async (user_id, type, content, link) => {
  const result = await pool.query(
    `INSERT INTO notifications (user_id, type, content, link) 
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [user_id, type, content, link]
  );
  return result.rows[0];
};