import { pool } from "../config/db.js";

export const createRoommateRequest = async (sender_id, listing_id, message) => {
  const query = `
        INSERT INTO roommate_requests 
        (sender_id, listing_id, message)
        VALUES ($1, $2, $3)
        RETURNING *
    `;
  const result = await pool.query(query, [sender_id, listing_id, message]);
  return result.rows[0];
};
// get Request id
export const getRequestById = async (request_id) => {
  const query = `
        SELECT *
        FROM roommate_requests
        WHERE request_id = $1
    `;
  const result = await pool.query(query, [request_id]);
  return result.rows[0];
};
// get Request for owner
export const getRequestsForOwner = async (owner_id) => {
  const query = `SELECT rr.*, u.name as sender_name, u.phone as sender_phone
        FROM roommate_requests rr
        JOIN shared_housing sh ON rr.listing_id = sh.listing_id
        JOIN users u ON rr.sender_id = u.userid
        WHERE sh.owner_id = $1
        ORDER BY rr.created_at DESC
    `;
  const result = await pool.query(query, [owner_id]);
  return result.rows;
};
//cheak existing
export const checkExistingRequest = async (sender_id, listing_id) => {
  const query = `
        SELECT * FROM roommate_requests
       WHERE sender_id = $1 
        AND listing_id = $2 
        AND status = 'pending'
    `;
  const result = await pool.query(query, [sender_id, listing_id]);
  return result.rows[0];
};
// accept Request
export const acceptRequest = async (request_id) => {
  const query = `
        UPDATE roommate_requests
        SET status = 'accepted'
        WHERE request_id = $1
        RETURNING *
    `;

  const result = await pool.query(query, [request_id]);
  return result.rows[0];
};
//rejected
export const rejectRequest = async (request_id) => {
  const query = `
        UPDATE roommate_requests
        SET status = 'rejected'
        WHERE request_id = $1
        RETURNING *
    `;
  const result = await pool.query(query, [request_id]);
  return result.rows[0];
};
// get My Requests
export const getMyRequests = async (sender_id) => {
    const query = `
        SELECT rr.*, 
               sh.title,
               sh.city,
               sh.price
        FROM roommate_requests rr
        JOIN shared_housing sh ON rr.listing_id = sh.listing_id
        WHERE rr.sender_id = $1
        ORDER BY rr.created_at DESC
    `;
    const result = await pool.query(query, [sender_id]);
    return result.rows;
};
// GET ALL REQUESTS (ADMIN)
export const getAllRequests = async () => {
  const query = `
    SELECT 
      rr.*,
      u.name AS sender_name,
      sh.title AS listing_title,
      sh.city,
      sh.price
    FROM roommate_requests rr
    JOIN users u 
      ON rr.sender_id = u.userid
    JOIN shared_housing sh 
      ON rr.listing_id = sh.listing_id
    ORDER BY rr.created_at DESC
  `;

  const result = await pool.query(query);

  return result.rows;
};
// Request As Viewed
export const markRequestAsViewed = async (request_id) => {
  const query = `
    UPDATE roommate_requests
    SET status = 'viewed'
    WHERE request_id = $1
    RETURNING *
  `;
  const result = await pool.query(query, [request_id]);
  return result.rows[0];
};