import { pool } from "../config/db.js";
// create a new user
export const createUser = async (
  name,
  email,
  phone,
  hashed_password,
  role,
  is_active,
) => {
  const query = `INSERT INTO users (name, email, phone, hashed_password, role, is_active) 
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
  const result = await pool.query(query, [
    name,
    email,
    phone,
    hashed_password,
    role,
    is_active,
  ]);
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

