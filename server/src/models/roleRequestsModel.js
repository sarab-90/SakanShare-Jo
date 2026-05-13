import {pool} from "../config/db.js";

export const createRoleRequest = async (
  user_id,
  message,
  phone,
  city
) => {
  const result = await pool.query(
    `
    INSERT INTO role_requests
    (user_id, message, phone, city)
    VALUES ($1,$2,$3,$4)
    RETURNING *
    `,
    [user_id, message, phone, city]
  );

  return result.rows[0];
};
export const getAllRoleRequests = async () => {
  const result = await pool.query(`
    SELECT 
      role_requests.*,
      users.name,
      users.email
    FROM role_requests
    JOIN users
    ON users.userid = role_requests.user_id
    ORDER BY role_requests.created_at DESC
  `);

  return result.rows;
};

export const getRoleRequestById = async (id) => {
  const result = await pool.query(
    `
    SELECT * FROM role_requests
    WHERE id = $1
    `,
    [id]
  );

  return result.rows[0];
}
export const acceptRoleRequestModel = async (id, user_id) => {
  await pool.query(
    `
    UPDATE role_requests
    SET status = 'accepted'
    WHERE id = $1
    `,
    [id]
  )
  await pool.query(
    `
    UPDATE users
    SET role = 'landlord'
    WHERE userid = $1
    `,
    [user_id]
  );
};

export const rejectRoleRequestModel = async (id) => {
  await pool.query(
    `
    UPDATE role_requests
    SET status = 'rejected'
    WHERE id = $1
    `,
    [id]
  );
};
