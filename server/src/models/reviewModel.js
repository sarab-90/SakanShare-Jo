import { pool } from "../config/db.js";

export const createReview = async (reviewer_id, reviewed_user_id, rating, comment) => {
  const result = await pool.query(
    `INSERT INTO reviews (reviewer_id, reviewed_user_id, rating, comment)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [reviewer_id, reviewed_user_id, rating, comment]
  );
  return result.rows[0];
};

export const getReviewsByUserId = async (reviewed_user_id) => {
  const result = await pool.query(
    `SELECT r.*, u.name as reviewer_name 
     FROM reviews r
     JOIN users u ON r.reviewer_id = u.userid
     WHERE r.reviewed_user_id = $1
     ORDER BY r.created_at DESC`,
    [reviewed_user_id]
  );
  return result.rows;
};
export const getUserRatingStats = async (userId) => {
  const result = await pool.query(
    `SELECT COUNT(*) as total_reviews, ROUND(AVG(rating), 1) as avg_rating 
     FROM reviews WHERE reviewed_user_id = $1`,
    [userId]
  );
  return result.rows[0];
};
// إضافة رد المالك 
export const addReply = async (review_id, reviewed_user_id, owner_reply) => {
  const result = await pool.query(
    `UPDATE reviews 
     SET owner_reply = $1, reply_date = NOW() 
     WHERE review_id = $2 AND reviewed_user_id = $3 
     RETURNING *`,
    [owner_reply, review_id, reviewed_user_id]
  );
  return result.rows[0];
};
// جلب أفضل المالكين
export const getTopRatedLandlords = async (limit) => {
  const result = await pool.query(
    `SELECT 
      u.userid, u.name, 
      ROUND(AVG(r.rating), 1) as avg_rating, 
      COUNT(r.review_id) as total_reviews
     FROM users u
     JOIN reviews r ON u.userid = r.reviewed_user_id
     WHERE u.role = 'landlord'
     GROUP BY u.userid
     HAVING COUNT(r.review_id) > 0
     ORDER BY avg_rating DESC, total_reviews DESC
     LIMIT $1`,
    [limit]
  );
  return result.rows;
};