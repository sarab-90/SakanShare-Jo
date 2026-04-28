import { pool } from "../config/db.js";
// Get all users
export const getAllUsers = async () => {
  const result = await pool.query(`SELECT * FROM users`);
  return result.rows;
};
// Get user by ID
export const getUserById = async (id) => {
  const result = await pool.query(
    `SELECT name, email, phone, role, is_active, created_at FROM users WHERE userid = $1`,
    [id],
  );
  return result.rows[0];
};
// get user by email
export const getUserByEmail = async (email) => {
  const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);
  return result.rows[0];
};
// Update user 
export const updateUser = async (id, name, email, phone) => {
    const result = await pool.query(
        `UPDATE users SET name = $1, email = $2, phone = $3 WHERE userid = $4 RETURNING name, email, phone`,
        [name, email, phone, id]
    );
    return result.rows[0];
};
// delete user
export const deleteUser = async (id) => {
    await pool.query(`DELETE FROM users WHERE userid = $1`, [id]);
}
// deactivate user
export const deactivateUser = async (id) => {
    const result = await pool.query(
        `UPDATE users SET is_active = false WHERE userid = $1 RETURNING *`,
        [id]
    );
    return result.rows[0];
};
// change password
export const changePassword = async (userid, hashed_password) => {
    const result = await pool.query(
        `UPDATE users SET hashed_password = $1 WHERE userid = $2 RETURNING *`,
        [hashed_password, userid]
    );
    return result.rows[0];  
};
// save refresh token
export const saveRefreshToken = async (userid, refresh_token) => {
    await pool.query(
        `UPDATE users SET refresh_token = $1 WHERE userid = $2`,
        [refresh_token, userid]
    );
};