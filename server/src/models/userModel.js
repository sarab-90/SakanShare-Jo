import { pool } from "../config/db.js";
// Get all users
export const getAllUsers = async () => {
  const result = await pool.query(`SELECT * FROM users`);
  return result.rows;
};
// Get user by ID
export const getUserById = async (id) => {
  const result = await pool.query(
    `SELECT userid, name, email, phone, role, is_active, created_at, hashed_password FROM users WHERE userid = $1`,
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
        `UPDATE users SET name = $1, email = $2, phone = $3 WHERE userid = $4 RETURNING *`,
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
export const completeUserOnboarding = async (id) => {
  const result = await pool.query(
    `UPDATE users 
     SET onboarding_completed = true 
     WHERE userid = $1 
     RETURNING *`,
    [id]
  );

  return result.rows[0];
};

export const findMatches = async (userId, city, budget, gender) => {
  const query = `
    SELECT userid, name, city, budget, gender, bio 
    FROM users 
    WHERE userid != $1 
    AND city = $2 
    AND budget <= $3 + 50 
    AND budget >= $3 - 50 
    AND gender = $4
    AND onboarding_completed = true
  `;
  const values = [userId, city, budget, gender];
  const { rows } = await pool.query(query, values);
  return rows;
};

export const getUserPreferences = async (userId) => {
  const query = "SELECT city, budget, gender FROM users WHERE userid = $1";
  const { rows } = await pool.query(query, [userId]);
  return rows[0];
};
// (Public Profile)
export const findPublicUserById = async (id) => {
    const query = "SELECT userid, name, role FROM users WHERE userid = $1";
    const { rows } = await pool.query(query, [id]);
    return rows[0];
};