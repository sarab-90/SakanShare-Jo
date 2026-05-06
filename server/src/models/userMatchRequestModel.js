import { pool } from "../config/db.js";

// CREATE REQUEST
export const createMatchRequest = async (
  sender_id,
  receiver_id,
  message
) => {
  const result = await pool.query(
    `INSERT INTO user_match_requests 
    (sender_id, receiver_id, message)
    VALUES ($1, $2, $3)
    RETURNING *`,
    [sender_id, receiver_id, message]
  );

  return result.rows[0];
};

// GET SENT REQUESTS
export const getSentMatchRequests = async (userid) => {
  const result = await pool.query(
    `SELECT umr.*, u.name AS receiver_name
     FROM user_match_requests umr
     JOIN users u ON u.userid = umr.receiver_id
     WHERE umr.sender_id = $1
     ORDER BY umr.created_at DESC`,
    [userid]
  );

  return result.rows;
};

// GET RECEIVED REQUESTS
export const getReceivedMatchRequests = async (userid) => {
  const result = await pool.query(
    `SELECT umr.*, u.name AS sender_name
     FROM user_match_requests umr
     JOIN users u ON u.userid = umr.sender_id
     WHERE umr.receiver_id = $1
     ORDER BY umr.created_at DESC`,
    [userid]
  );

  return result.rows;
};

// UPDATE STATUS
export const updateMatchRequestStatus = async (request_id, status) => {
  const result = await pool.query(
    `UPDATE user_match_requests
     SET status = $1
     WHERE request_id = $2
     RETURNING *`,
    [status, request_id]
  );

  return result.rows[0];
};

// CHECK DUPLICATE REQUEST 
export const checkExistingRequest = async (sender_id, receiver_id) => {
  const result = await pool.query(
    `SELECT * FROM user_match_requests
     WHERE sender_id = $1 AND receiver_id = $2
     AND status = 'pending'`,
    [sender_id, receiver_id]
  );

  return result.rows[0];
};
export const getDiscoveryMatches = async (userId) => {
  const result = await pool.query(
    `SELECT 
        u.userid, 
        u.name,
        p.city,
        p.budget,
        p.smoking,
        (
          (CASE WHEN p.city = (SELECT city FROM preferences WHERE userid = $1) THEN 40 ELSE 0 END) +
          (CASE WHEN ABS(p.budget - (SELECT budget FROM preferences WHERE userid = $1)) <= 50 THEN 30 ELSE 0 END) +
          (CASE WHEN p.smoking = (SELECT smoking FROM preferences WHERE userid = $1) THEN 30 ELSE 0 END)
        ) AS match_score
     FROM users u
     JOIN preferences p ON u.userid = p.userid
     WHERE u.userid != $1
     ORDER BY match_score DESC`,
    [userId]
  );
  return result.rows;
};