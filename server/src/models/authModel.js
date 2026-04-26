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
