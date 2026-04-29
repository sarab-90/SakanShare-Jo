import pool from "../config/db.js";
// create preferences
export const createPreferences = async (
  userid,
  gender,
  min_age,
  max_age,
  smoking,
  sleep_time,
  cleanliness,
  noise_tolerance,
  pets_allowed,
  guest_policy,
  additional_notes,
  budget,
) => {
  const query = `INSERT INTO preferences 
    (userid, gender, min_age, max_age, smoking, sleep_time, cleanliness, noise_tolerance, pets_allowed, guest_policy, additional_notes, budget)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`;
  const result = await pool.query(query, [
    userid,
    gender,
    min_age,
    max_age,
    smoking,
    sleep_time,
    cleanliness,
    noise_tolerance,
    pets_allowed,
    guest_policy,
    additional_notes,
    budget,
  ]);
  return result.rows[0];
};
// get preferences by user id
export const getPreferencesByUserId = async (userid) => {
  const query = `SELECT * FROM preferences WHERE userid = $1`;
  const result = await pool.query(query, [userid]);
  return result.rows[0];
};
// update preferences
export const updatePreferences = async (userid, updates) => {
  const {
    gender,
    min_age,
    max_age,
    smoking,
    sleep_time,
    cleanliness,
    noise_tolerance,
    pets_allowed,
    guest_policy,
    additional_notes,
    budget,
  } = updates;
  const query = `UPDATE preferences SET 
        gender = COALESCE($1, gender),
        min_age = COALESCE($2, min_age),
        max_age = COALESCE($3, max_age),
        smoking = COALESCE($4, smoking),
        sleep_time = COALESCE($5, sleep_time),
        cleanliness = COALESCE($6, cleanliness),
        noise_tolerance = COALESCE($7, noise_tolerance),
        pets_allowed = COALESCE($8, pets_allowed),
        guest_policy = COALESCE($9, guest_policy),
        additional_notes = COALESCE($10, additional_notes),
        budget = COALESCE($11, budget)
    WHERE userid = $12 RETURNING *`;
  const result = await pool.query(query, [
    gender,
    min_age,
    max_age,
    smoking,
    sleep_time,
    cleanliness,
    noise_tolerance,
    pets_allowed,
    guest_policy,
    additional_notes,
    budget,
    userid,
  ]);
  return result.rows[0];
};
