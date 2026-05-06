import { pool } from "../config/db.js";

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
  city,
  preferred_room_type,
  furnished
) => {
  const result = await pool.query(
    `INSERT INTO preferences 
    (userid, gender, min_age, max_age, smoking, sleep_time, cleanliness, noise_tolerance, pets_allowed, guest_policy, additional_notes, budget, city, preferred_room_type, furnished)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
    RETURNING *`,
    [
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
      city,
      preferred_room_type,
      furnished,
    ]
  );
  return result.rows[0];
};

export const getPreferencesByUserId = async (userid) => {
  const result = await pool.query(
    `SELECT * FROM preferences WHERE userid = $1`,
    [userid]
  );
  return result.rows[0];
};

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
    city,
    preferred_room_type,
    furnished,
  } = updates;

  const result = await pool.query(
    `UPDATE preferences SET
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
      budget = COALESCE($11, budget),
      city = COALESCE($12, city),
      preferred_room_type = COALESCE($13, preferred_room_type),
      furnished = COALESCE($14, furnished)
    WHERE userid = $15
    RETURNING *`,
    [
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
      city,
      preferred_room_type,
      furnished,
      userid,
    ]
  );
  return result.rows[0];
};