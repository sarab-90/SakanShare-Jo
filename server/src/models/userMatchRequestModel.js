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

// CHECK DUPLICATE REQUEST (important)
export const checkExistingRequest = async (sender_id, receiver_id) => {
  const result = await pool.query(
    `SELECT * FROM user_match_requests
     WHERE sender_id = $1 AND receiver_id = $2
     AND status = 'pending'`,
    [sender_id, receiver_id]
  );

  return result.rows[0];
};